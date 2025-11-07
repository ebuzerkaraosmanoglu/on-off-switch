    /**
         * Verilen bir div'i dinamik bir rocker switch'e dönüştürür.
         * @param {HTMLElement} targetElement - Düğmeye dönüştürülecek div.
         * @param {object} options - Opsiyonlar
         * @param {string} [options.ledColor='#00ff00'] - 'on' durumundaki LED rengi (CSS rengi).
         * @param {string} [options.initialState='off'] - 'on' veya 'off'.
         * @param {function} [options.onOn] - Düğme 'on' durumuna geçtiğinde çalışacak fonksiyon.
         * @param {function} [options.onOff] - Düğme 'off' durumuna geçtiğinde çalışacak fonksiyon.
         */
        function createRockerSwitch(targetElement, options = {}) {
            targetElement.innerHTML = ''; 
            const rocker = document.createElement('div');
            rocker.className = 'rocker';
            
            const textOff = document.createElement('span');
            textOff.className = 'text-off';
            textOff.textContent = 'O';
            
            const textOn = document.createElement('span');
            textOn.className = 'text-on';
            textOn.textContent = 'I';

            rocker.appendChild(textOff);
            rocker.appendChild(textOn);
            targetElement.appendChild(rocker);
            
            targetElement.classList.add('switch-body');
            
            const ledColor = options.ledColor || '#00ff00';
            targetElement.style.setProperty('--led-color', ledColor);

            if (options.initialState === 'on') {
                targetElement.classList.add('is-on');
            }

            targetElement.addEventListener('click', function() {
                targetElement.classList.toggle('is-on');
                
                if (targetElement.classList.contains('is-on')) {
                    if (options.onOn && typeof options.onOn === 'function') {
                        options.onOn();
                    }
                } else {
                    if (options.onOff && typeof options.onOff === 'function') {
                        options.onOff();
                    }
                }
            });
        }


        document.addEventListener('DOMContentLoaded', function() {

            const sw1 = document.getElementById('switch-1');
            createRockerSwitch(sw1, {
                onOn: function() {
                    console.log('Düğme 1 AÇILDI (ON)');
                },
                onOff: function() {
                    console.log('Düğme 1 KAPANDI (OFF)');
                }
            });

            const sw2 = document.getElementById('switch-2');
            createRockerSwitch(sw2, {
                ledColor: 'red',
                initialState: 'off',
                onOn: function() {
                    console.log('Düğme 2 AÇIK');
                },
                onOff: function() {
                    console.log('Düğme 2 KAPALI');
                }
            });
            
            const sw3 = document.getElementById('switch-3');
            createRockerSwitch(sw3, {
                ledColor: 'purple'
            });

        });