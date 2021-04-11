type TTransportTypes = "dash" | "smooth" | "directile" | "hls";

export function getTransportFromUrl(url: string): TTransportTypes {
  switch (true) {
    case /(sddvr|sd|sd-bis|.ism|.isml)(\/manifest)?(\?.*|)$/gi.test(url):
      return "smooth";
    case /\.(mpd)(\/manifest)?(\?.*|)$/gi.test(url):
      return "dash";
    case /(.m3u|.m3u8)(\/manifest)?(\?.*|)$/gi.test(url):
      return "hls";
    case /\.(mp4)$/gi.test(url):
    default:
      return "directile";
  }
}
