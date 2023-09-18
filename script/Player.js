export default class Player {
  WALK_ANIMATION_TIMER = 200;
  walkAnimationTimer = this.WALK_ANIMATION_TIMER;
  dinoRunImages = [];

  jumpPressed = false;
  jumpInProgress = false;
  falling = false;
  JUMP_SPEED = 0.6;
  GRAVITY = 0.4;

  constructor(ctx, width, height, minJumpHeight, maxJumpHeight, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.width = width;
    this.height = height;
    this.minJumpHeight = minJumpHeight;
    this.maxJumpHeight = maxJumpHeight;
    this.scaleRatio = scaleRatio;

    this.x = 10 * scaleRatio;
    this.y = this.canvas.height - this.height - 1.5 * scaleRatio;

    this.standingStillImage = new Image();
    this.standingStillImage.src = '../images/standing_still.png';
    this.image = this.standingStillImage;

    const dinoRunImage1 = new Image();
    dinoRunImage1.src = '../images/dino_run1.png';
    const dinoRunImage2 = new Image();
    dinoRunImage2.src = '../images/dino_run2.png';

    this.dinoRunImages.push(dinoRunImage1);
    this.dinoRunImages.push(dinoRunImage2);

    //keyboard
    window.removeEventListener('keydown', this.keydown);
    window.removeEventListener('keyup', this.keyup);

    window.addEventListener('keydown', this.keydown);
    window.addEventListener('keyup', this.keyup);

    //touch event
    window.removeEventListener('touchstart', this.touchstart);
    window.removeEventListener('touchend', this.touchend);

    window.addEventListener('touchstart', this.touchstart);
    window.addEventListener('touchend', this.touchend);
  }

  touchstart = () => {
    this.jumpPressed = true;
  };

  touchend = () => {
    this.jumpPressed = false;
  };

  keydown = (event) => {
    if (event.code === 'Space') {
      this.jumpPressed = true;
    }
  };

  keyup = (event) => {
    if (event.code === 'Space') {
      this.jumpPressed = false;
    }
  };

  update(gameSpeed, frameTimeDelta) {
    console.log(this.jumpPressed);
    this.run(gameSpeed, frameTimeDelta);
  }

  run(gameSpeed, frameTimeDelta) {
    if (this.walkAnimationTimer <= 0) {
      if (this.image === this.dinoRunImages[0]) {
        this.image = this.dinoRunImages[1];
      } else {
        this.image = this.dinoRunImages[0];
      }
      this.walkAnimationTimer = this.WALK_ANIMATION_TIMER;
    }
    this.walkAnimationTimer -= frameTimeDelta * gameSpeed;
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
