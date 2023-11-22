// Define a function to create and initialize the eBay component
function createEbayComponent() {
  // State variables
  let searchQuery = 'Benin Bronzes';
  let searchResults = [];
  let isLoading = false;
  let pageNumber = 1;
  let entriesPerPage = 100;
  let totalPages = 0;
  let hasMore = true;
  let totalEntries = 0;
  let showInfoPopup = false;
  let activeTab = 0;
  let hoveredImage = null;
  let hoveredImageIndex = null;

  // Function to show the image popup
  function showImagePopup(image, index) {
    hoveredImage = image;
    hoveredImageIndex = index;
  }

  // Function to hide the image popup
  function hideImagePopup() {
    hoveredImage = null;
  }

  // Function to close the info popup
  function closePopup() {
    showInfoPopup = false;
  }

  // Function to render tab label
  function renderTabLabel(label, tabIndex) {
    return activeTab === tabIndex ? `[${label}]` : label;
  }

  // Event listener to close popup if clicked outside
  function handleClickOutside(event) {
    if (popupRef && !popupRef.contains(event.target)) {
      closePopup();
    }
  }

  // Function to toggle info popup
  function toggleInfoPopup() {
    showInfoPopup = !showInfoPopup;
    console.log(showInfoPopup);
    if (!showInfoPopup) {
      closePopup();
    }
  }

  // Function to handle tab change
  function handleTabChange(newValue) {
    activeTab = newValue;
  }

  // Function to handle search
  async function handleSearch(value = 1) {
    isLoading = true;
    try {
      const response = await axios.get(
        `https://proxy.cors.sh/${XEBAY_API_URL}services/search/FindingService/v1?keywords=${searchQuery}&paginationInput.pageNumber=${value}&paginationInput.entriesPerPage=${entriesPerPage}`,
        {
          headers: {
            'X-EBAY-SOA-SECURITY-APPNAME': XEBAY_SOA_SECURITY_APPNAME,
            'X-EBAY-SOA-GLOBAL-ID': XEBAY_SOA_GLOBAL_ID,
            'X-EBAY-SOA-OPERATION-NAME': XEBAY_SOA_OPERATION_NAME,
            'x-cors-api-key': CORS_API_KEY,
          },
        }
      );

      const result = xml2js(response.data);
      const items = result.findItemsByKeywordsResponse.searchResult[0].item;
      const entriesPerPage = result.findItemsByKeywordsResponse.paginationOutput[0].entriesPerPage;
      const totalPages = result.findItemsByKeywordsResponse.paginationOutput[0].totalPages;
      const totalEntries = result.findItemsByKeywordsResponse.paginationOutput[0].totalEntries;

      searchResults = items;
      pageNumber = value;
      entriesPerPage = entriesPerPage[0];
      totalPages = totalPages[0];
      totalEntries = totalEntries[0];
      isLoading = false;
    } catch (error) {
      isLoading = false;
    }
  }

  // Function to handle focus
  function handleFocus() {
    setIsFocused(true);
  }

  // Function to handle blur
  function handleBlur() {
    setIsFocused(false);
  }

  // Function to handle change
  function handleChange(value) {
    handleSearch(value);
  }

  // Return an object with public methods and state variables
  return {
    toggleInfoPopup,
    handleTabChange,
    showImagePopup,
    hideImagePopup,
    handleSearch,
    handleFocus,
    handleBlur,
    handleChange,
    // Include other state variables as needed
  };
}

// Initialize the eBay component
const ebayComponent = createEbayComponent();

