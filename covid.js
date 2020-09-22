/*
 * A classe Bola representa uma entidade composta por dois
 * atributos: location e velocity, vetores que representam,
 * respectivamente, a posição e a velocidade. Além disso
 * a classe fornece métodos para atualizar a posição,
 * mostrar ou desenhar o objeto na tela e checar se a posição
 * está colidindo com as bordas do canvas.
 */
class Bola {
    // declara os atributos da classe
    // inicializa posição e velocidade com valores aleatórios
    constructor() {
        this.location = createVector(random(width), random(height));
        this.velocity = createVector(random(-2, 2), random(-2, 2));
        // tamanho da bola
        this.dim = 10;
        this.hdim = this.dim / 2;
        this.infectada = false;
        this.tempo = 0;
        this.recuperado = false;
    }

    // Movimento 101: atualiza a posição pela velocidade
    // location = location + velocity
    update() {
        this.location.add(this.velocity);
    }

    // Movimento 101: desenha a bola na tela
    display() {
        stroke(0);
        if (this.recuperado) {
            fill('pink');
            ellipse(this.location.x, this.location.y, this.dim, this.dim);
        } else {
            if (this.infectada) {
                fill('orange');
                ellipse(this.location.x, this.location.y, this.dim, this.dim);
                //text('frame da contaminação: ' + this.tempo, this.location.x, this.location.y);
            } else {
                fill('blue');
                ellipse(this.location.x, this.location.y, this.dim, this.dim);
            }
        }
    }
    recuperacao() {
        if (this.infectada) {
            this.tempo += 1;
            if (this.tempo == 600) {
                this.recuperado = true;
                this.infectada = false;
                //infec -= 1;
            }
        }
    }
    colisao() {
        for (const b of bolas) {
            if (dist(b.location.x, b.location.y, this.location.x, this.location.y) < this.dim) {
                if (b.infectada && !(this.recuperado)) {
                    this.infectada = true;
                }
                let c = b.velocity.y;
                b.velocity.y = this.velocity.y;
                let a = b.velocity.x;
                b.velocity.x = this.velocity.x;
                this.velocity.x = a;
                this.velocity.y = c;
            }
        }
    }

    // Checa se a bola está colidindo com as bordas
    // do canvas. Se estiver colidindo, move em direção
    // contrária (velocidade = velocidade * (-1)
    checkEdges() {
        if ((this.location.x + this.hdim > width) || (this.location.x - this.hdim < 0)) {
            this.velocity.x *= -1;
        }
        if ((this.location.y + this.hdim > height) || (this.location.y - this.hdim < 0)) {
            this.velocity.y *= -1;
        }
    }
}

var bolas = [];
var quantBolas = 99;

function setup() {
    createCanvas(400, 400);
    smooth();
    b1 = new Bola();
    b1.infectada = true;
    bolas.push(b1);
    for (var i = 0; i < quantBolas; i++) {
        bolas.push(new Bola());
    }
    frameRate(150);
}
var infec = 0;
var recup = 0;

function contarInfec() {
    for (const b of bolas) {
        if (b.infectada) {
            infec += 1;
        }
    }
}

function contarRecup() {
    for (const b of bolas) {
        if (b.recuperado) {
            recup += 1;
        }
    }
}

var ant = null;
var t = 1;

function draw() {
    background(255);

    for (const bola of bolas) {
        bola.update();
        bola.checkEdges();
        bola.display();
        bola.colisao();
        bola.recuperacao();
    }
    infec = 0;
    recup = 0;
    contarInfec();
    contarRecup();
    fill('red');
    text('INFECTADOS: ' + infec, 115, 10);
    text('RECUPERADOS: ' + recup, 115, 25);
    text('FRAME: ' + t, 10, 25);
    text('INDIVIDUOS: ' + (quantBolas + 1), 10, 10);
    noFill();
    t += 1;
}