import React, { useState } from "react";
import dynamic from "next/dynamic";
import p5Types from "p5";

// Lazy-load react-p5 (avoids SSR issues)
const Sketch = dynamic(() => import("react-p5"), { ssr: false });

/** Note durations in beats */
const noteValues: Record<string, number> = {
    w: 4,
    h: 2,
    q: 1,
    e: 0.5,
    s: 0.25,
};

/** Pitch values for positioning */
const pitchValues: Record<string, number> = {
    R: -1,
    Db: 0.5,
    C: 1.0,
    B: 2.0,
    Bb: 2.5,
    A: 3.0,
    Ab: 3.5,
    G: 4.0,
    Gb: 4.5,
    F: 5.0,
    E: 6.0,
    Eb: 6.5,
    D: 7.0,
};

/** Represents a musical note */
class Note {
    pitch: string;
    length: string;
    isRest: boolean;

    constructor(pitch: string, length: string) {
        this.pitch = pitch;
        this.length = length;
        this.isRest = pitch === "R";
    }

    info(): string {
        return this.isRest ? `Rest${this.length}` : `${this.pitch}${this.length}`;
    }
}

/** Represents a measure (collection of notes) */
class Measure {
    notes: Note[];
    maxBeats: number;
    measureValue: number;

    constructor() {
        this.notes = [];
        this.maxBeats = 4;
        this.measureValue = 0;
    }

    addNote(note: Note): boolean {
        const noteValue = noteValues[note.length] ?? 0;
        if (this.measureValue + noteValue <= this.maxBeats) {
            this.notes.push(note);
            this.measureValue += noteValue;
            return true;
        }
        return false;
    }

    removeNote(noteIndex: number): void {
        if (noteIndex >= 0 && noteIndex < this.notes.length) {
            const removed = this.notes.splice(noteIndex, 1)[0];
            this.measureValue -= noteValues[removed.length] ?? 0;
        }
    }
}

/** Represents a song (collection of measures) */
class Song {
    measures: Measure[];
    title: string;
    bpm: number;

    constructor(title: string, bpm: number) {
        this.measures = [];
        this.title = title;
        this.bpm = bpm;
    }

    addMeasure(measure: Measure): void {
        this.measures.push(measure);
    }
}

/** React-P5 Component */
const Game: React.FC = () => {
    const [song] = useState(() => {
        const newSong = new Song("Hot Cross Buns", 40);
        const measures = Array.from({ length: 4 }, () => new Measure());

        measures[0].addNote(new Note("B", "q"));
        measures[0].addNote(new Note("A", "q"));
        measures[0].addNote(new Note("G", "h"));

        measures[1].addNote(new Note("B", "q"));
        measures[1].addNote(new Note("A", "q"));
        measures[1].addNote(new Note("G", "h"));

        measures[2].addNote(new Note("G", "e"));
        measures[2].addNote(new Note("G", "e"));
        measures[2].addNote(new Note("G", "e"));
        measures[2].addNote(new Note("G", "e"));
        measures[2].addNote(new Note("A", "e"));
        measures[2].addNote(new Note("A", "e"));
        measures[2].addNote(new Note("A", "e"));
        measures[2].addNote(new Note("A", "e"));

        measures[3].addNote(new Note("B", "q"));
        measures[3].addNote(new Note("A", "q"));
        measures[3].addNote(new Note("G", "h"));

        measures.forEach((m) => newSong.addMeasure(m));
        return newSong;
    });

    let scrollX = song.measures.length * 300;
    const scrollSpeed = 2;
    const measureWidth = 300;
    const canvasWidth = 800;
    let noteImageq: p5Types.Image;
    let noteImageh: p5Types.Image;
    let noteImagee: p5Types.Image;

    /** P5 Setup */
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(canvasWidth, 400).parent(canvasParentRef);
        noteImageq = p5.loadImage("/Haxophone/quaterNote.png");
        noteImageh = p5.loadImage("/Haxophone/halfNote.png");
        noteImagee = p5.loadImage("/Haxophone/eighthNote.png");

        p5.imageMode(p5.CENTER);
    };

    /** P5 Draw */
    const draw = (p5: p5Types) => {
        p5.background(220);
        scrollX -= scrollSpeed;

        if (scrollX < -song.measures.length * measureWidth) {
            scrollX = -song.measures.length * measureWidth;
        }

        // Draw staff lines
        for (let i = 0; i < 5; i++) {
            p5.line(50, 50 + i * 30, canvasWidth - 50, 50 + i * 30);
        }

        let currentX = 50 + scrollX;
        song.measures.forEach((measure) => {
            p5.line(currentX, 50, currentX, 170);
            let positionIndex = 0;
            measure.notes.forEach((note) => {
                let noteLength = noteValues[note.length] ?? 0;
                let z = measureWidth / 8; // Split measure into 8 parts

                let y = 100;
                if (note.pitch !== "R") {
                    let notePitch = pitchValues[note.pitch] ?? 0;
                    y = 15 * notePitch + 80;

                    if (note.length === "q") {
                        p5.image(noteImageq, currentX + positionIndex * z + z / 2, y, 30, 30);
                        positionIndex += 2; // Skip 2 positions for quarter note
                    } else if (note.length === "h") {
                        p5.image(noteImageh, currentX + positionIndex * z + z / 2, y, 30, 30);
                        positionIndex += 4; // Skip 4 positions for half note
                    } else if (note.length === "e") {
                        p5.image(noteImagee, currentX + positionIndex * z + z / 2, y-10, 30, 30);
                        positionIndex += 1; // Skip 1 position for eighth note
                    }
                } else {
                    p5.fill(0);
                    p5.circle(currentX + positionIndex * z + z / 2, y, 30);
                    positionIndex += noteLength * 2; // Skip positions based on note length
                }
            });
            currentX += measureWidth;
        });
        p5.line(currentX, 50, currentX, 170);
        currentX += 5;
        p5.line(currentX, 50, currentX, 170);

    };

    return <Sketch setup={setup} draw={draw} />;
};

export default Game;
