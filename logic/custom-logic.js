$(document).ready(function() {
    // Wait a tiny bit for the Block class to exist
    setTimeout(function() {
        if (typeof Block !== 'undefined') {
            const originalDraw = Block.prototype.draw;

            Block.prototype.draw = function() {
                ctx.save();
                
                // 1. NEON GLOW (Bloom)
                ctx.shadowBlur = 15;
                ctx.shadowColor = this.color;

                // 2. 3D CRYSTAL GRADIENT
                // Creates a shine effect on top of the block
                let grd = ctx.createLinearGradient(this.x, this.y - 10, this.x, this.y + 10);
                grd.addColorStop(0, 'rgba(255, 255, 255, 0.5)'); // Highlight
                grd.addColorStop(0.2, this.color);               // Main Color
                grd.addColorStop(1, 'rgba(0, 0, 0, 0.3)');       // Shadow

                ctx.fillStyle = grd;

                // 3. DRAW BLOCK (Calls your original logic)
                originalDraw.apply(this, arguments);

                // 4. CRYSTAL EDGE (The "Glass" outline)
                ctx.shadowBlur = 0;
                ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
                ctx.lineWidth = 1;
                ctx.stroke();

                ctx.restore();
            };
        }
    }, 500);
});
