var config = {
    type: Phaser.AUTO,
  //  width: window.innerWidth,
   // height: window.innerHeight,
   width: 500,
   height: 500,
    autoResize: true,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 1000 }
        }
    }, 
    scene: [{
        preload: preload,
        create: create,
        update: update
    }]
};




var rota_izquier=-2, rota_derec=+2, retroceso_entra=0;
var vuelta=0;

var ancho=108, alto=48;
var caza=0, counter=0;

class MyScene extends Phaser.Scene {
    preload (){
        this.load.image('face', 'http://labs.phaser.io/assets/pics/bw-face.png');
    }
    create (data){
        this.face = this.add.image(data.x, data.y, 'face');
    }
}


var game = new Phaser.Game(config);

var jugador, b;

var arriba,derecha,izquierda, reloj=0;

const velocidad = 350;
const alturaSalto = -530;
var sonic;




		







function preload() {
  //  this.load.spritesheet('personaje1', 'assets/sprites/personaje1.png', { frameWidth: 57, frameHeight: 62 });

    

	//this.load.image('bullet','assets/bullet.png', { frameWidth: 14, frameHeight: 14 });
	 this.load.audio('sound_escopeta', 'assets/sound/escopeta.ogg', {
        instances: 1
    });
	 this.load.audio('sound_cuac', 'assets/sound/cuac.ogg', {
        instances: 1
    });
	 this.load.audio('sound_ganso', 'assets/sound/pato.ogg', {
        instances: 1
    });
	this.load.image('esco', 'assets/escopeta0.png');
	this.load.image('mirilla', 'assets/mirilla.png');
	this.load.image('ground2', 'assets/platform0.png');
	this.load.spritesheet('dud', 'assets/dud.png', { frameWidth: 150, frameHeight: 230 });
	this.load.spritesheet('plumas', 'assets/plumas.png', { frameWidth: 500, frameHeight: 281 });
	this.load.spritesheet('plumas0', 'assets/plumas0.png', { frameWidth: 250, frameHeight: 141 });
	this.load.spritesheet('dudi', 'assets/dudi.png', { frameWidth: ancho, frameHeight: alto });
	
	
}

function create() {
	
	this.sound.add('sound_escopeta');
	this.sound.add('sound_cuac');
	 sonic = 	this.sound.add('sound_ganso');
	sonic.setLoop(true);
	sonic.play();
	

    game.config.backgroundColor.setTo(108, 210, 222);

	 f = this.physics.add.sprite(250, 475 , 'esco');

	f.setGravity(0,-1000);	
	
	f.setCollideWorldBounds(true);
	
	g = this.physics.add.sprite(250, 475 , 'mirilla');
	
	g.setGravity(0,-1000);
	
	g.setCollideWorldBounds(true);
	

	 this.anims.create({
            key: 'retro',
            frames: this.anims.generateFrameNumbers('dud', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: 0
        });
	
	
	
	
	
	 ganso = this.physics.add.sprite(200, 250, 'dudi');
		
        ganso.setBounce(0.2);

        ganso.setCollideWorldBounds(false);//en true no funciona el salto



        this.anims.create({
            key: 'right2',
            frames: this.anims.generateFrameNumbers('dudi', { start: 7, end: 13 }),
            frameRate: 10,
            repeat: -1
        });
		
		this.anims.create({
            key: 'left2',
            frames: this.anims.generateFrameNumbers('dudi', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
		
		this.anims.create({
            key: 'plum0',
            frames: this.anims.generateFrameNumbers('plumas0', { start: 0, end: 12 }),
            frameRate: 20,
            repeat: 0
        });
		
		this.anims.create({
            key: 'plum',
            frames: this.anims.generateFrameNumbers('plumas', { start: 0, end: 12 }),
            frameRate: 20,
            repeat: 0
        });
		
		this.anims.create({
            key: 'plum2',
            frames: this.anims.generateFrameNumbers('plumas', { start: 0, end: 6 }),
            frameRate: 20,
            repeat: 0
        });
		
		this.anims.create({
            key: 'plum3',
            frames: this.anims.generateFrameNumbers('plumas', { start: 6, end: 12 }),
            frameRate: 20,
            repeat: 0
        });
	
	ganso.setGravity(0,-1000);
	
	
	
	
	
	
	arriba = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    izquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    derecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
	firebutton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
	 abajo = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

	
}





function update() {
	
	
	
	
		if(ganso.x <= 500 && vuelta==0){
	 ganso.anims.play('right2', true);
	 ganso.setVelocityX(150);
	if(ganso.x >= 500){
		vuelta=1;

		} 
		
	}
	if(vuelta==1){
    ganso.anims.play('left2', true);
	ganso.setVelocityX(-150);
	
	if(ganso.x <= 50){
		vuelta=0;

		} 
}
	
	
	
	
	
	
if(retroceso_entra==1)	{
	


retroceso.setVisible(false);	
//retroceso.anims.play('retro', false);

f.setVisible(true);

}

	
	
	retroceso_entra=0;
	f.setVelocityX(0);
	g.setVelocityX(0);
	g.setVelocityY(0);

	if(derecha.isDown){

	f.setVelocityX(400);
	g.setVelocityX(400);

	}
	
	if(izquierda.isDown){

	f.setVelocityX(-400);
	g.setVelocityX(-400);

	}
	
	
	if(abajo.isDown){

	g.setVelocityY(400);
	
	rota_derec=rota_derec-2;
	
	
				if(rota_derec<=95){
	//	f.angle = rota_derec;
		rota_izquier=rota_derec;
		}
	}
	
	if(arriba.isDown){

	
	g.setVelocityY(-400);
	rota_izquier=rota_izquier+2;
	
	
				if(rota_izquier<=80){
	//	f.angle = rota_izquier;
		rota_derec=rota_izquier;
		}
	}
	

	
	if(firebutton.isDown){
	
	this.sound.play('sound_escopeta');﻿﻿﻿﻿

		f.setVisible(false);
		retroceso = this.physics.add.sprite(f.x, f.y-100, 'dud');

	retroceso.setGravity(0,-1000);
		
		
		
	retroceso.anims.play('retro', true);

		
		
		
		
		
		if((g.x>=ganso.x && g.x<=ganso.x+ancho) && (g.y>=ganso.y && g.y<=ganso.y+alto)){
			
			this.sound.play('sound_cuac');﻿﻿﻿﻿

				pl0 = this.physics.add.sprite(250, 250, 'plumas0');
				pl0.setGravity(0,-1000);
				pl0.anims.play('plum0', true);
			ganso.setGravity(0,1000);
			sonic.stop();
			caza=1;
			}
		
		retroceso_entra=1;

		
		
		}

if(caza==1)	{
	counter++;
	
	if(counter>=10 && counter<20){

		
		
			pl = this.physics.add.sprite(250, 250, 'plumas');
				pl.setGravity(0,-1000);
				pl.anims.play('plum', true);
				
				pl2 = this.physics.add.sprite(250, 250, 'plumas');
				pl2.setGravity(0,-1000);
				pl2.anims.play('plum2', true);
				
				pl3 = this.physics.add.sprite(250, 250, 'plumas');
				pl3.setGravity(0,-1000);
				pl3.anims.play('plum3', true);
			
			
			
			
			
			pl4 = this.physics.add.sprite(250, 0, 'plumas');
				pl4.setGravity(0,-1000);
				pl4.anims.play('plum', true);
				
				
					pl24 = this.physics.add.sprite(250, 0, 'plumas');
				pl24.setGravity(0,-1000);
				pl24.anims.play('plum2', true);
				
				pl34 = this.physics.add.sprite(250, 0, 'plumas');
				pl34.setGravity(0,-1000);
				pl34.anims.play('plum3', true);
				
				
				
				
				
				
				
				pl5 = this.physics.add.sprite(250, 500, 'plumas');
				pl5.setGravity(0,-1000);
				pl5.anims.play('plum', true);
				
				pl25 = this.physics.add.sprite(250, 500, 'plumas');
				pl25.setGravity(0,-1000);
				pl25.anims.play('plum2', true);
				
				pl35 = this.physics.add.sprite(250, 500, 'plumas');
				pl35.setGravity(0,-1000);
				pl35.anims.play('plum3', true);
		
		
		
				pl.setVisible(false);
				
				
		}
}

}
