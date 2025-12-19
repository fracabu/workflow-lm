import React, { useEffect, useRef } from 'react';

interface BackgroundAnimationProps {
  isDarkMode?: boolean;
}

const BackgroundAnimation: React.FC<BackgroundAnimationProps> = ({ isDarkMode = true }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Configuration
    const nodeCount = Math.min(Math.floor(width / 20), 50); // Number of "Agents"
    const connectionDistance = 200; // Max distance to form a link
    const packetChance = 0.005; // Chance per frame to spawn a data packet on a link
    const packetSpeed = 2.5; // Speed of data flow

    // NotebookLM Brand Colors
    const colors = ['#4285F4', '#9B72CB', '#D96570']; 
    
    // Theme Colors
    const connectionColor = isDarkMode ? '80, 80, 80' : '200, 200, 200';

    // --- Classes ---

    class Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseSize: number;
      currentSize: number;
      color: string;
      pulseTimer: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        // Very slow, stable movement
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.baseSize = Math.random() * 1.5 + 1; // 1px to 2.5px
        this.currentSize = this.baseSize;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.pulseTimer = 0;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off screen edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Pulse effect when receiving data
        if (this.pulseTimer > 0) {
            this.currentSize = this.baseSize + (this.pulseTimer / 10); // Grow
            this.pulseTimer--;
        } else {
            this.currentSize = this.baseSize;
        }
      }

      triggerPulse() {
          this.pulseTimer = 20; // Frames to stay enlarged
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.currentSize, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Add a glow based on pulse
        if (this.pulseTimer > 0) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.color;
        } else {
            ctx.shadowBlur = 0;
        }
        ctx.shadowBlur = 0; // Reset for next draw calls
      }
    }

    interface Packet {
        startNode: Node;
        endNode: Node;
        progress: number; // 0.0 to 1.0
        color: string;
    }

    const nodes: Node[] = [];
    let packets: Packet[] = [];

    // Initialize Nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node());
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Update and Draw Nodes
      nodes.forEach(node => {
        node.update();
        node.draw();
      });

      // 2. Handle Connections & Packets
      // We iterate through pairs to find connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];

          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const distSq = dx * dx + dy * dy; // Avoid sqrt for perf check first

          if (distSq < connectionDistance * connectionDistance) {
            // Draw faint static connection line
            const dist = Math.sqrt(distSq);
            const opacity = 1 - dist / connectionDistance;
            
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${connectionColor}, ${opacity * 0.15})`; 
            ctx.lineWidth = 1;
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();

            // Randomly spawn a data packet
            if (Math.random() < packetChance) {
                // Decide direction randomly
                const forward = Math.random() > 0.5;
                packets.push({
                    startNode: forward ? n1 : n2,
                    endNode: forward ? n2 : n1,
                    progress: 0,
                    color: forward ? n1.color : n2.color
                });
            }
          }
        }
      }

      // 3. Update and Draw Packets
      // Use a new array to filter out finished packets
      const nextPackets: Packet[] = [];

      packets.forEach(pkt => {
        // Calculate distance to determine step size (constant speed regardless of distance)
        const dx = pkt.endNode.x - pkt.startNode.x;
        const dy = pkt.endNode.y - pkt.startNode.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Safety check if nodes drifted too far (instant kill)
        if (dist > connectionDistance + 50) return;

        const step = packetSpeed / dist;
        pkt.progress += step;

        if (pkt.progress >= 1) {
            // Packet arrived! Trigger pulse on end node
            pkt.endNode.triggerPulse();
        } else {
            // Draw Packet
            const currX = pkt.startNode.x + dx * pkt.progress;
            const currY = pkt.startNode.y + dy * pkt.progress;

            // Draw the head of the packet
            ctx.beginPath();
            ctx.arc(currX, currY, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = pkt.color; // Use the sender's color
            ctx.fill();

            // Draw a small trailing tail for speed effect
            const tailLength = 15;
            // Calculate tail position (backwards along the line)
            const tailX = currX - (dx / dist) * tailLength;
            const tailY = currY - (dy / dist) * tailLength;

            const gradient = ctx.createLinearGradient(currX, currY, tailX, tailY);
            gradient.addColorStop(0, pkt.color);
            gradient.addColorStop(1, 'transparent');

            ctx.beginPath();
            ctx.moveTo(currX, currY);
            ctx.lineTo(tailX, tailY);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.stroke();
            
            nextPackets.push(pkt);
        }
      });

      packets = nextPackets;

      animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [isDarkMode]);

  return (
    <div className={`fixed inset-0 z-0 pointer-events-none transition-colors duration-500 ${isDarkMode ? 'bg-[#131314]' : 'bg-[#F8FAFC]'}`}>
      <canvas ref={canvasRef} className="block" />
      {/* Subtle radial gradient to darken corners, keeping focus center */}
      <div className={`absolute inset-0 bg-radial-gradient from-transparent opacity-80 ${isDarkMode ? 'via-[#131314]/30 to-[#131314]' : 'via-white/30 to-white'}`}></div>
    </div>
  );
};

export default BackgroundAnimation;