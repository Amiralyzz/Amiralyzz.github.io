function setCookie(cname, cvalue, exdays) {
    const date = new Date();
    date.setTime(date.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ date.toUTCString();
    console.log(cvalue);
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cookieName) {
    let name = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookie.split(';');
    for(let i = 0; i <cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) == ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(name) == 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return "";
  }

  function checkCookie() {
    let cookieLabItems = getCookie("labData");
    if (cookieLabItems != "") {
      // for (let i=0; i< cookieLabItems.length; i++) {
      //   labItems[i] = JSON.parse(cookieLabItems[i]);
      // }
      setCookie("labData", cookieLabItems, -365);
      // labItems = JSON.parse(cookieLabItems);
    } else {
      cookieLabItems = labItems.map(JSON.stringify);
      if (cookieLabItems != "" && cookieLabItems != null) {
        // setCookie("labData", cookieLabItems, 365);
      }
    }
  }