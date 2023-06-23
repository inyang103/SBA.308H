// main.js



// chain the functions with promises
preloadAssets()
    .then(() => {
        // displayPreloadedImages();
        loaderCurtain('hide');
        gameLoop();
    })
    .catch(() => {
        console.error('Error in asset preload.');
    });



function gameLoop() {
    console.log("called: gameLoop()");
    // const canvas = document.getElementById("main-canvas");
    // const ctx = canvas.getContext("2d");
    // canvas.width = 1280;
    // canvas.height = 720;
}


// declare an array of assets for preload
const assetsForPreload = [
    { src: 'Image/red-circle.svg', type: 'image' },
    { src: 'Image/space_bg1.png', type: 'image' },
    { src: 'Image/space_bg_dust1.png', type: 'image' },
    { src: 'Image/Screenshot-VegaStrike', type: 'image' },
    // { src: 'assets/track01.mp3', type: 'sound' },
    // { src: 'assets/track02.mp3', type: 'sound' },
];

// display or hide the loading curtain
function loaderCurtain(action) {
    const curtainElement = document.getElementById('curtain');
    if (action === 'show') {
        curtainElement.style.display = 'block';
    } else if (action === 'hide') {
        curtainElement.style.display = 'none';
    } else {
        console.error('Invalid action provided. Use "show" or "hide".');
    }
}



// object to store preloaded assets
const preloadedAssets = {};





// preload the assets and return a promise
function preloadAssets() {
    return new Promise((resolve, reject) => {
        let assetsLoaded = 0;
        const totalAssets = assetsForPreload.length;

        assetsForPreload.forEach(asset => {
            let element;
            if (asset.type === 'image') {
                element = new Image();
            } else if (asset.type === 'sound') {
                element = new Audio();
            }

            element.src = asset.src;

            element.addEventListener('load', () => {
                preloadedAssets[asset.src] = element;
                assetsLoaded++;
                console.log("loaded: " + asset); // added this
                if (assetsLoaded === totalAssets) {
                    resolve();
                }
            });

            element.addEventListener('error', () => {
                reject();
            });
        });
    });
}





// demonstration function which places the fully-loaded images into image-container 
function displayPreloadedImages() {
    const imageContainer = document.getElementById('image-container');
    console.log("called: displayPreloadedImages");
    // loop through preloadedAssets
    for (const src in preloadedAssets) {
        if (preloadedAssets.hasOwnProperty(src)) {
            // for every image make an <img> element
            const imgElement = document.createElement('img');
            // set the src attribute using the preloaded asset
            imgElement.src = src;
            // put the <img> element in the container
            imageContainer.appendChild(imgElement);
        }
    }
}
