
    // Accordion Settings 
    const accSettings = {
      speed: 500, // Animation speed
      oneOpen: true, // Close all other accordion items if true
      offsetAnchor: true, // Activate scroll to top for active item
      offsetFromTop: 180, // In pixels – Scroll to top at what distance
      scrollTopDelay: 400, // In Milliseconds – Delay before scroll to top 
      
      classes: {
          accordion: 'js-accordion',
        header: 'js-accordion-header',
        item: 'js-accordion-item',
        body: 'js-accordion-body',
        icon: 'js-accordion-icon',    active: 'active',
    
      }
    };
    
    
    const prefix = accSettings.classes
    
    const accordion = (function(){
      const accordionElem = $(`.${prefix.accordion}`)
      const accordionHeader = accordionElem.find(`.${prefix.header}`)
      const accordionItem = $(`.${prefix.item}`)
      const accordionBody = $(`.${prefix.body}`)
      const accordionIcon = $(`.${prefix.icon}`)
      const activeClass = prefix.active
        
      return {
        // pass configurable object literal
        init: function(settings) {
          accordionHeader.on('click', function() {
            accordion.toggle($(this));
            if(accSettings.offsetAnchor) {
                setTimeout(() => { 
                    $('html').animate({scrollTop: $(this).offset().top-accSettings.offsetFromTop}, accSettings.speed);
                    }, accSettings.scrollTopDelay);
            }
          });
          
          $.extend(accSettings, settings); 
          
          // ensure only one accordion is active if oneOpen is true
          if(settings.oneOpen && $(`.${prefix.item}.${activeClass}`).length > 1) {
            $(`.${prefix.item}.${activeClass}:not(:first)`).removeClass(activeClass).find(`.${prefix.header} > .${prefix.icon}`).removeClass(activeClass);
          }
          // reveal the active accordion bodies
          $(`.${prefix.item}.${activeClass}`).find(`> .${prefix.body}`).show();
          
        },
        
        toggle: function($this) {
          if(accSettings.oneOpen && $this[0] != $this.closest(accordionElem).find(`> .${prefix.item}.${activeClass} > .${prefix.header}`)[0]) {
            $this.closest(accordionElem).find(`> .${prefix.item}`).removeClass(activeClass).find(accordionBody).slideUp(accSettings.speed);
            $this.closest(accordionElem).find(`> .${prefix.item}`).find(`> .${prefix.header} > .${prefix.icon}`).removeClass(activeClass);
          }
          
          // show/hide the clicked accordion item
          $this.closest(accordionItem).toggleClass(`${activeClass}`).find(`> .${prefix.header} > .${prefix.icon}`).toggleClass(activeClass);
          $this.next().stop().slideToggle(accSettings.speed);
        }
      }
    })();
    
    $(document).ready(function(){
      accordion.init(accSettings);
    });
    </script>
    
    <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js"></script>
    
    <script>
    document.addEventListener('DOMContentLoaded', function() {
      // Function to show popup message
      function showPopupMessage() {
        const popup = document.createElement('div');
        popup.textContent = 'DRAG THE 3D MODEL TO MOVE';
        popup.style.position = 'fixed';
        popup.style.top = '20px';
        popup.style.left = '50%';
         popup.style.lineHeight = '1';
          popup.style.fontSize= '2rem';
            popup.style.color = 'limegreen';
             popup.style.border = '1px dashed limegreen';
        popup.style.fontFamily = 'pixelifysans';
        popup.style.transform = 'translateX(-50%)';
        popup.style.backgroundColor = '#000000';
        popup.style.padding = '0px 10px';
        popup.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
        popup.style.zIndex = '1000';
        document.body.appendChild(popup);
    
        // Remove the popup after 10 seconds
        setTimeout(() => {
          document.body.removeChild(popup);
        }, 10000);
      }
    
      // Add click event listener to each button
      const loadButtons = document.querySelectorAll('.load-button');
      loadButtons.forEach(button => {
        button.addEventListener('click', function() {
          const targetSelector = this.getAttribute('data-target');
          const modelViewer = document.querySelector(targetSelector);
          if (modelViewer) {
            // Check if the model has been dismissed
            if (modelViewer.hasAttribute('dismissed')) {
              // Reset the poster
              modelViewer.toggleAttribute('dismissed', false);
              modelViewer.showPoster();
              this.textContent = "VIEW 3D SCAN";
              this.style.backgroundColor = "";
            } else {
              // Dismiss the poster and show popup
              modelViewer.toggleAttribute('dismissed', true);
              modelViewer.dismissPoster();
              this.textContent = "CLOSE 3D SCAN";
              this.style.backgroundColor = "yellow";
              showPopupMessage(); // Show the popup message
            }
          }
        });
      });
    
      // Set up posters for each model viewer
      const modelViewers = document.querySelectorAll('.lazy-load');
      modelViewers.forEach((modelViewer) => {
        const posterDiv = modelViewer.nextElementSibling;
        if (posterDiv) {
          posterDiv.style.backgroundImage = `url(${modelViewer.getAttribute('poster')})`;
          modelViewer.removeAttribute('poster');
        }
      });
    });
