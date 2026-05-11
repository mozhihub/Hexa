$(document).ready(function() {
    console.log("Hexa Crystal Logic Loaded!");

    // 1. Injected 3D Drawing for Blocks
    if (typeof Block !== 'undefined') {
        const originalDraw = Block.prototype.draw;
        Block.prototype.draw = function() {
            ctx.save();
            
            // Neon Bloom effect
            ctx.shadowBlur = 20 * (settings.scale || 1);
            ctx.shadowColor = this.color;
            
            // 3D Crystal Gradient logic
            // Calculating vertical gradient for depth
            let grd = ctx.createLinearGradient(this.x, this.y - 15, this.x, this.y + 15);
            grd.addColorStop(0, 'rgba(255, 255, 255, 0.45)'); // Shine
            grd.addColorStop(0.3, this.color);               // Main Color
            grd.addColorStop(1, 'rgba(0, 0, 0, 0.4)');       // 3D Shadow
            
            ctx.fillStyle = grd;
            
            // Execute original path drawing
            originalDraw.apply(this, arguments);
            
            // Sharp Crystal Edge
            ctx.shadowBlur = 0;
            ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
            ctx.lineWidth = 1;
            ctx.stroke();
            
            ctx.restore();
        };
    }

    // 2. Score & Background Sync
    const originalRender = window.render;
    window.render = function() {
        // Redraw Background Pattern in Canvas
        ctx.save();
        ctx.fillStyle = "#0a0c10";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = "rgba(52, 152, 219, 0.08)";
        ctx.lineWidth = 1;
        let step = 40 * (settings.scale || 1);
        for (var i = 0; i < canvas.width; i += step) {
            ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
        }
        for (var i = 0; i < canvas.height; i += step) {
            ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
        }
        ctx.restore();

        // Run the game's original render
        originalRender.apply(this, arguments);
    };
});
