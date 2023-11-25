
    
    <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js"></script>
    

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
