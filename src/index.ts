import * as PIXI from 'pixi.js';
import './styles.css';
import rocketImagePath from '../images/rocket.png';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.
const app = new PIXI.Application({ resizeTo: window });

// The application will create a canvas element for you that you
// can then insert into the DOM.
document.body.appendChild(app.view);

const $ = document.getElementById.bind(document);

let settingCourse = true;

function toggleSettingCourse() {
  $('set-a-course-button').classList.toggle('setting-course');
  $('cancel-button').classList.toggle('setting-course');
  $('info-box').classList.toggle('setting-course');
  $('info-box-group').classList.toggle('setting-course');
  $('go-button').classList.toggle('setting-course');
}

$('set-a-course-button').addEventListener('click', () => {
  settingCourse = !settingCourse;

  toggleSettingCourse();
});

$('cancel-button').addEventListener('click', toggleSettingCourse);

app.loader.add('rocket', rocketImagePath).load((loader, resources) => {
  // This creates a texture from a 'rocket.png' image.
  const rocket = new PIXI.Sprite(resources.rocket.texture);

  rocket.width = 50;
  rocket.height = 50;
  // Setup the position of the rocket

  // Rotate around the center
  rocket.anchor.x = 0.5;
  rocket.anchor.y = 0.5;

  // Add the rocket to the scene we are building.
  app.stage.addChild(rocket);

  // Listen for frame updates
  app.ticker.add(() => {
    // each frame we spin the rocket around a bit
    if (settingCourse) rocket.rotation += 0.1;
    rocket.x = app.renderer.width / 2;
    rocket.y = app.renderer.height / 2;
  });
});
