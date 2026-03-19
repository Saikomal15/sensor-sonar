let distance = 0
let size = 0

basic.forever(function () {
    distance = sonar.ping(
        DigitalPin.P0,
        DigitalPin.P2,
        PingUnit.Centimeters
    )

    // Hard-coded thresholds (Farthest = 5x5 / Loudest)
    if (distance > 40 || distance == 0) {
        size = 4 // Full 5x5
    } else if (distance > 30) {
        size = 3 // 4x4
    } else if (distance > 20) {
        size = 2 // 3x3
    } else if (distance > 10) {
        size = 1 // 2x2
    } else {
        size = 0 // 1 LED
    }

    // 1. AUDIO: Pitch and Volume
    // Map the volume: Size 4 (farthest) = 255 (loud), Size 0 (closest) = 50 (quiet)
    let volume = Math.map(size, 0, 4, 50, 255)
    music.setVolume(volume)

    // Pitch also changes with size so it's a double effect
    let pitch = 200 + (size * 200)
    music.playTone(pitch, music.beat(BeatFraction.Sixteenth))

    // 2. GRAPHIC: Draw the square
    basic.clearScreen()
    for (let x = 0; x <= size; x++) {
        for (let y = 0; y <= size; y++) {
            led.plot(x, y)
        }
    }

    basic.pause(100)
})