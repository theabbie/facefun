var axios = require("axios");
var fd = require("form-data");
var fs = require("fs");

module.exports = async function(path) {
  var data = new fd();
  data.append("wm","");
  data.append("collage","");
  data.append("id","");
  data.append("no_crop","");
  data.append("code","");
  data.append("type",1);
  data.append("image",fs.createReadStream(path));
  var res = await axios({
    url: 'http://portraitplus.facefun.ai:8080/Port/MakePortBulk',
    method: 'POST',
    data: data,
    headers: data.getHeaders()
  });
  res.data.files = res.data.files.map(x=>"http://images.portraitai.app/"+x);
  return res.data;
}
