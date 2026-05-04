class Rain {
    constructor(x, y, H) {
        this.x = x + random(-20, 20);
        this.y = y;
        this.OUT = false;
        this.H = H;
    }

    displayRain() {
        push();
        colorMode(HSB,100);
        stroke(this.H, 50,100);
        strokeWeight(5);
        line(this.x, this.y, this.x, this.y + 5);
        pop();
    }

    updateRain() {
        this.y = this.y + 5;
        if (this.y > height) {
            this.OUT = true;
        }
    }
}
