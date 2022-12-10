var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
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

var game = new Phaser.Game(config);

var jugador;

var arriba,derecha,izquierda;

const velocidad = 350;
const alturaSalto = -530;

var mapa, bullets, firebutton; 
var solidos, x, global_wall;
var wall=[];
function preload() {
    this.load.spritesheet('personaje1', 'assets/sprites/personaje1.png', { frameWidth: 57, frameHeight: 62 });

    this.load.tilemapTiledJSON('mapa', 'assets/mapa/mapa.json');
    this.load.image('tiles','assets/mapa/tileSets.png');
	this.load.image('bullet','assets/bullet.png');
	this.load.image('estrella','assets/star.png');
	//this.load.image('bullet','assets/bullet.png', { frameWidth: 14, frameHeight: 14 });
	
	this.load.image('ground', 'assets/platform.png');
	this.load.image('ground2', 'assets/platform2.png');
}

function create() {
    game.config.backgroundColor.setTo(108, 210, 222);

    mapa = this.make.tilemap({ key: 'mapa' });
    var tilesets = mapa.addTilesetImage('tileSets', 'tiles');

    var nubes = mapa.createDynamicLayer('nubes', tilesets, 0, 0);

    solidos = mapa.createDynamicLayer('solidos', tilesets, 0, 0);
    solidos.setCollisionByProperty({ solido: true });
	
	
	    platforms = this.physics.add.staticGroup();


		platforms.create(600, 500, 'ground');

	platforms.visible=false;
	
	bullets = this.add.group();
	
	bullets = this.physics.add.sprite();
	bullets.enableBody=true;
	

	x=0;
	for(i=432; i>0; i=i-32){
	wall[x] = this.physics.add.sprite(800, i, 'ground2');	
	wall[x].setGravity(0,-1000);	
		wall[x] = this.physics.add.staticGroup();
		wall[x].enableBody=true;
		x++;
		}
		let randomSprite = Phaser.Utils.Array.GetRandom(wall[0]);
	alert(randomSprite);

	firebutton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    jugador = this.physics.add.sprite(0,0,'personaje1',0);
    jugador.setSize(30,0);

    this.anims.create({
        key: 'caminar',
        frames: this.anims.generateFrameNumbers('personaje1', { start: 1, end: 8 }),
        frameRate: 10
    });


	
    this.physics.add.collider(jugador, solidos);

    this.cameras.main.setBounds(0, 0, mapa.widthInPixels, mapa.heightInPixels);
    this.cameras.main.startFollow(jugador);

    arriba = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    izquierda = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    derecha = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
}
var chit=0;
function update() {
	
	
	if(this.bullets){

	for(i=0; i<wall.length; i++){
	alert(wall[i].val);
		if(((this.bullets.x)+100)>=wall[i].x){
	
			this.estrella = this.physics.add.sprite(wall[i].x, this.bullets.y, 'estrella');
		

		this.bullets.destroy(this.bullets);
		
		
		
		this.bullets=false;

		global_wall=i;
			alert(global_wall);
		break;
		}
		
		
		
		}

		} 
	
	
	
    jugador.body.setVelocityX(0);

    if(izquierda.isDown){
        jugador.body.setVelocityX(-velocidad);
        jugador.flipX = true;

    }

    if(derecha.isDown){
        jugador.body.setVelocityX(velocidad);
        jugador.flipX = false;
    }

    if(arriba.isDown && jugador.body.onFloor()){
        jugador.body.setVelocityY(alturaSalto);
    }

    if((izquierda.isDown || derecha.isDown) && jugador.body.onFloor()){
        jugador.anims.play('caminar',true);
    }else if(!jugador.body.onFloor()){
        jugador.setFrame(9);
    }else{
        jugador.setFrame(0);
    }
    
	if(firebutton.isDown && chit==0){
	chit=1;

		}

		
		if(chit==1){
	
	if(!firebutton.isDown){
		
	this.bullets = this.physics.add.sprite(jugador.x, jugador.y, 'bullet');
	this.bullets.body.setVelocity(1000,0).setBounce(1, 1).setCollideWorldBounds(false);

	this.bullets.setGravity(0,-1000);
	this.physics.add.collider(this.bullets, wall[global_wall]);
	chit=0;

	}
		}

	
}

