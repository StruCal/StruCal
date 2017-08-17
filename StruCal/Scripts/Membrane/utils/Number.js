var tolerane = 0.0000001;
Number.prototype.isApproximatelyEqualTo = function(value) {
    if (Math.abs(this.valueOf() - value) < tolerane) {
        return true;
    } else {
        return false;
    }
}