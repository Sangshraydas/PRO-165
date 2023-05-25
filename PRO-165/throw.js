AFRAME.registerComponent("bowling-balls", {
    init: function () {
      this.shootBullet();
    },
    throwball: function () {
      window.addEventListener("keydown", (e) => {
        if (e.key === "z") {
          var bullet = document.createElement("a-entity");
  
          ball.setAttribute("geometry", {
            primitive: "sphere",
            radius: 0.1,
          });
  
          ball.setAttribute("material", "color", "gold");
  
          var cam = document.querySelector("#camera");
  
          pos = cam.getAttribute("position");
  
          ball.setAttribute("position", {
            x: pos.x,
            y: pos.y,
            z: pos.z,
          });
  
          var camera = document.querySelector("#camera").object3D;
  
          //get the camera direction as Three.js Vector
          var direction = new THREE.Vector3();
          camera.getWorldDirection(direction);
  
          //set the velocity and it's direction
          bullet.setAttribute("velocity", direction.multiplyScalar(-10));
  
          var scene = document.querySelector("#scene");
  
          scene.appendChild(bullet);
        }
      });
    },
});
    removeBall: function (e) {
      //Original entity (ball)
      console.log(e.detail.target.el);

      //Other entity, which bullet touched.
      console.log(e.detail.body.el);

      //ball element
      var element = e.detail.target.el;

      //element which is hit
      var elementHit = e.detail.body.el;

      if (elementHit.id.includes("box")) {
        elementHit.setAttribute("material", {
          opacity: 1,
          transparent: true,
        });

        //impulse and point vector
        var impulse = new CANNON.Vec3(-2, 2, 1);
        var worldPoint = new CANNON.Vec3().copy(
          elementHit.getAttribute("position")
        );

        elementHit.body.applyImpulse(impulse, worldPoint);

        //remove event listener
        element.removeEventListener("collide", this.shoot);

        //remove the bullets from the scene
        var scene = document.querySelector("#scene");
        scene.removeChild(element);
      }
    },
});
    
  