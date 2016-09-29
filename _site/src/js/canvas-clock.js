var canvasClock = {
    ctx: document.getElementById("drawing").getContext("2d"),

    init: function () {
        this.ctx.strokeStyle = '#000';
        this.ctx.fillStyle = "#000";
        this.ctx.font = "bold 14px Arial";
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        this.ctx.lineWidth = 2;
    },

    clear: function (){
        this.ctx.translate(-100,-100);
        this.ctx.clearRect(0,0,200,200);
    },

    drawBackground: function () {
        var angle;
        this.ctx.beginPath();
        this.ctx.translate(100, 100);
        this.ctx.arc(0, 0, 3, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.moveTo(99, 0);
        this.ctx.arc(0, 0, 99, 0, 2 * Math.PI);
        this.ctx.moveTo(94, 0);
        this.ctx.arc(0, 0, 94, 0, 2 * Math.PI);
        for (var i = 1; i <= 12; i += 1) {
            angle = i * Math.PI / 6;
            this.ctx.moveTo(Math.sin(angle) * 94, -Math.cos(angle) * 94);
            this.ctx.lineTo(Math.sin(angle) * 89, -Math.cos(angle) * 89);
            this.ctx.fillText(String(i), Math.sin(angle) * 80, -Math.cos(angle) * 80);
        }
        this.ctx.closePath();
    },

    drawContext: function () {
        var time = new Date(),
            s = time.getSeconds() / 60 * 2 * Math.PI,
            m = time.getMinutes() / 60 * 2 * Math.PI,
            h = time.getHours() % 12 / 12 * 2 * Math.PI;
        this.drawBackground();
        //绘制时分秒针
        this.ctx.closePath();
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(Math.sin(h) * 50, -Math.cos(h) * 50);
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(Math.sin(m) * 70, -Math.cos(m) * 70);
        this.ctx.moveTo(0, 0);
        this.ctx.lineTo(Math.sin(s) * 85, -Math.cos(s) * 85);
        this.ctx.stroke();
    },

    run: function (){
        var now = this;
        this.init();
        this.drawContext();
        setInterval(function(){
            now.clear();
            now.drawContext();
        }, 1000);
    }
};


