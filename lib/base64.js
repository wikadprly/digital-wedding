export const base64 = {
  encode: (str) => {
    try {
      return btoa(encodeURIComponent(str));
    } catch (error) {
      console.error("Base64 encode error:", error);
      return "";
    }
  },

  decode: (str) => {
    try {
      return decodeURIComponent(atob(str));
    } catch (error) {
      console.error("Base64 decode error:", error);
      return "";
    }
  },
};

export const safeBase64 = {
  encode: (str) => {
    try {
      return btoa(encodeURIComponent(str))
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
    } catch (error) {
      console.error("Safe base64 encode error:", error);
      return "";
    }
  },

  decode: (str) => {
    try {
      str = str.replace(/-/g, "+").replace(/_/g, "/");
      while (str.length % 4) str += "=";
      return decodeURIComponent(atob(str));
    } catch (error) {
      console.error("Safe base64 decode error:", error);
      return "";
    }
  },
};
