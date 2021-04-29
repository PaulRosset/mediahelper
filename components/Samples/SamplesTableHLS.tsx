import { Title } from "../Widgets/Title";
import { Copy } from "../Widgets/Copy";

export const M3U8_FILES = [
  {
    title: "Tears of Steel m3u8",
    isEncrypted: false,
    url:
      "https://demo.unified-streaming.com/video/tears-of-steel/tears-of-steel.ism/.m3u8",
  },
  {
    title: "Big Buck Bunny VOD m3u8",
    isEncrypted: false,
    url:
      "https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8",
  },
  {
    title: "Sintel VOD m3u8",
    isEncrypted: false,
    url:
      "https://multiplatform-f.akamaihd.net/i/multi/april11/sintel/sintel-hd_,512x288_450_b,640x360_700_b,768x432_1000_b,1024x576_1400_m,.mp4.csmil/master.m3u8",
  },
  {
    title: "fMP4 m3u8",
    isEncrypted: false,
    url:
      "https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8",
  },
  {
    title: "Live m3u8 1",
    isEncrypted: false,
    url: "https://cph-p2p-msl.akamaized.net/hls/live/2000341/test/master.m3u8",
  },
  {
    title: "Live m3u8 2",
    isEncrypted: false,
    url:
      "https://moctobpltc-i.akamaihd.net/hls/live/571329/eight/playlist.m3u8",
  },
  {
    title: "Dolby Multichannel m3u8",
    isEncrypted: false,
    url:
      "https://d3rlna7iyyu8wu.cloudfront.net/skip_armstrong/skip_armstrong_multichannel_subs.m3u8",
  },
  {
    title: "Dolby Multilanguage m3u8",
    isEncrypted: false,
    url:
      "http://d3rlna7iyyu8wu.cloudfront.net/skip_armstrong/skip_armstrong_multi_language_subs.m3u8",
  },
  {
    title: "Dolby Vision Profile 5 – Dolby Atmos m3u8",
    isEncrypted: false,
    url:
      "https://media.developer.dolby.com/DolbyVision_Atmos/profile5_HLS/master.m3u8",
  },
  {
    title: "Azure 4K HLSv4 m3u8",
    isEncrypted: false,
    url:
      "https://amssamples.streaming.mediaservices.windows.net/634cd01c-6822-4630-8444-8dd6279f94c6/CaminandesLlamaDrama4K.ism/manifest(format=m3u8-aapl)",
  },
];

export const SamplesTableHLS = () => {
  return (
    <div className="widget-container">
      <div className="widget-header">
        <Title text="Samples HLS files (.m3u8)" anchor="samples-files-m3u8" />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th colSpan="3">HLS Samples (.m3u8)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="title-th">Title</th>
              <th className="encrypted-th">Is Encrypted</th>
              <th className="url-th">URL</th>
            </tr>
            {M3U8_FILES.map((file) => (
              <tr key={file.title}>
                <td>{file.title}</td>
                <td>{String(file.isEncrypted)}</td>
                <td className="fileUrl-td">
                  {file.url.substring(0, 50)}
                  ...
                </td>
                <td>
                  <Copy text={file.url} color="black" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
