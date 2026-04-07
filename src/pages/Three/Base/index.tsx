import { useEffect, useRef } from 'react';
import * as THREE from 'three';
// 引入轨道控制器扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//引入性能监视器stats.js
// import Stats from 'three/addons/libs/stats.module.js';
// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const Base = () => {
  let requestId: any = null;
  const baseRef = useRef<HTMLDivElement>(null);

  // 创建3D场景对象Scene
  const scene = new THREE.Scene();

  // AxesHelper：辅助观察的坐标系
  const axesHelper = new THREE.AxesHelper(150);
  scene.add(axesHelper);

  //点光源：两个参数分别表示光源颜色和光照强度
  // 参数1：0xffffff是纯白光,表示光源颜色
  // 参数2：1.0,表示光照强度，可以根据需要调整
  const pointLight = new THREE.PointLight(0xffffff, 1.0);

  pointLight.decay = 0.0; //设置光源不随距离衰减

  //点光源位置
  pointLight.position.set(400, 200, 300);

  scene.add(pointLight); //点光源添加到场景中

  //创建一个长方体几何对象Geometry
  const geometry = new THREE.BoxGeometry(100, 100, 100);

  //创建一个材质对象Material MeshBasicMaterial-不受光照影响 MeshLambertMaterial-漫反射 MeshPhongMaterial-镜面反射
  const material = new THREE.MeshLambertMaterial({
    side: THREE.DoubleSide, //两面可见
    color: 0xff0000, //0xff0000设置材质颜色为红色
    transparent: true, //开启透明
    // opacity: 0.5, //设置透明度
  });

  // 两个参数分别为几何体geometry、材质material
  const mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh

  //设置网格模型在三维空间中的位置坐标，默认是坐标原点
  mesh.position.set(0, 10, 0);

  scene.add(mesh);

  // width和height用来设置相机输出Canvas画布的尺寸(单位:像素px)
  const width = 800; //宽度
  const height = 500; //高度
  // 实例化一个透视投影相机对象
  // fov-30:视场角度
  // aspect-width / height:Canvas画布宽高比
  // near-1:近裁截面
  // far-3000：远裁截面
  const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
  // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
  // camera.updateProjectionMatrix();

  camera.position.set(200, 200, 200); // 根据需要设置相机位置具体值

  // 相机观察目标指向Threejs 3D空间中某个位置
  camera.lookAt(0, 0, 0); // 坐标原点
  // camera.lookAt(mesh.position); // 指向mesh对应的位置

  // 创建渲染器对象
  const renderer = new THREE.WebGLRenderer({
    antialias:true, // 开启抗锯齿
  });
  renderer.setSize(width, height); //设置three.js渲染区域的尺寸(像素px)

  renderer.render(scene, camera); //执行渲染操作

  // 有这个则可以使用鼠标进行控制
  const controls = new OrbitControls(camera, renderer.domElement);

  //创建stats对象-性能监视器
  // const stats = new Stats();
  // //stats.domElement:web页面上输出计算结果,一个div元素，
  // document.body.appendChild(stats.domElement);

  // 实例化一个gui对象
  const gui = new GUI();

  const guiObj = {
    rotate: {
      Y: {
        value: true,
        step: 0.01,
        min: -Math.PI,
        max: Math.PI,
        name: '旋转角度'
      }
    }
  };

  //改变交互界面style属性
  gui.domElement.style.right = '0px';
  gui.domElement.style.width = '300px';

  const guiMesh = gui.addFolder('物体属性');
  // .add(控制对象，对象具体属性，其他参数)
  // gui增加交互界面，用来改变obj对应属性
  guiMesh.add(mesh.position, 'x', -100, 100);
  guiMesh.add(mesh.position, 'y', -50, 50);
  guiMesh.add(mesh.position, 'z', -60, 60);

  const guiPointLight = gui.addFolder('环境光属性');
  guiPointLight.add(pointLight, 'intensity', 0, 2.0).name('环境光强度').step(0.1);

  const guiObjRotate = gui.addFolder('动画属性');
  guiObjRotate.add(guiObj.rotate.Y, 'value').name('是否绕Y轴旋转');
  guiObjRotate.add(guiObj.rotate.Y, 'step', -0.5, 0.5).name('绕Y轴旋转速度').step(0.01);

  // 渲染循环
  // const clock = new THREE.Clock();
  function animate() {
    // const spt = clock.getDelta() * 1000; //毫秒
    // console.log('两帧渲染时间间隔(毫秒)', spt);
    // console.log('帧率FPS', 1000 / spt);
    //requestAnimationFrame循环调用的函数中调用方法update(),来刷新时间
	  // stats.update(); // 更新 性能监视器 中的统计信息
    if (guiObj.rotate.Y.value) {
      // mesh.rotateY(0.01); //每次绕y轴旋转0.01弧度
      mesh.rotateY(guiObj.rotate.Y.step);
    }
    renderer.render(scene, camera); //执行渲染操作
    requestId = requestAnimationFrame(animate); //请求再次执行渲染函数render，渲染下一帧
  }

  function stopAnimation() {
    if (requestId) {
      cancelAnimationFrame(requestId);
      requestId = null;
    }
  }

  useEffect(() => {
    baseRef.current?.appendChild(renderer.domElement);

    animate();

    //监听鼠标、键盘事件
    controls.addEventListener('change', function () {
      renderer.render(scene, camera); //执行渲染操作
    });

    return () => {
      stopAnimation();
      controls.removeEventListener('change');
    };
  }, [baseRef]);

  return (
    <div>
      <div ref={baseRef}></div>
    </div>
  );
};

export default Base;
