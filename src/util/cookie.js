// 设置cookie
export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + encrypt(escape(cvalue), passKey) + "; " + expires;
  }
  //获取cookie
  export function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) != -1) {
        var cnameValue = unescape(c.substring(name.length, c.length));
        return decrypt(cnameValue, passKey);
      }
    }
    return "";
  }
  //清除cookie  
  export function clearCookie(cname) {
    setCookie(cname, "", -1);
  }
