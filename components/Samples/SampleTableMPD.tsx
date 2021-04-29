import { Title } from "../Widgets/Title";
import { Copy } from "../Widgets/Copy";

export const MPD_FILES = [
  {
    title: "HEVC HDR 4k Live Profile",
    isEncrypted: false,
    url: "https://dash.akamaized.net/dash264/TestCasesHEVC/1b/5/MultiRate.mpd",
  },
  {
    title: "HEVC 4K HDR Single video",
    isEncrypted: false,
    url: "https://dash.akamaized.net/dash264/TestCasesHEVC/1a/5/MultiRate.mpd",
  },
  {
    title: "Live (dynamic) with inband dash event",
    isEncrypted: false,
    url: "https://livesim.dashif.org/livesim/scte35_2/testpic_2s/Manifest.mpd",
  },
  {
    title: "Trick Mode, Live profile, Segment Template",
    isEncrypted: false,
    url:
      "https://dash.akamaized.net/dash264/TestCases/9b/qualcomm/2/MultiRate.mpd",
  },
  {
    title: "Multi-Period",
    isEncrypted: false,
    url:
      "https://dash.akamaized.net/dash264/TestCasesIOP33/multiplePeriods/2/manifest_multiple_Periods_Add_Remove_AdaptationSet.mpd",
  },
];

export const SamplesTableMPD = () => {
  return (
    <div className="widget-container">
      <div className="widget-header">
        <Title text="Samples DASH files (.mpd)" anchor="samples-files-mpd" />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th colSpan="3">DASH Samples (.mpd)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Title</th>
              <th>Is Encrypted</th>
              <th>URL</th>
            </tr>
            {MPD_FILES.map((file) => (
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

export default SamplesTableMPD;
