import { Title } from "../Widgets/Title";
import { Copy } from "../Widgets/Copy";

export const OTHERS_FILES = [
  {
    title: "MP4 File",
    isEncrypted: false,
    url: "https://samplelib.com/lib/preview/mp4/sample-20s.mp4",
  },
  {
    title: "WEBM File",
    isEncrypted: false,
    url: "https://samplelib.com/lib/preview/webm/sample-20s.webm",
  },
  {
    title: "OGG File",
    isEncrypted: false,
    url: "https://filesamples.com/samples/audio/ogg/sample4.ogg",
  },
];

export const SamplesTableOthers = () => {
  return (
    <div className="widget-container">
      <div className="widget-header">
        <Title text="Samples Others files" anchor="samples-files-other" />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th colSpan={3}>Others Samples (.mp4/.webm/.ogg)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Title</th>
              <th>Is Encrypted</th>
              <th>URL</th>
            </tr>
            {OTHERS_FILES.map((file) => (
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

export default SamplesTableOthers;
