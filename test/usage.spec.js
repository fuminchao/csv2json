const {readCSVasJson} = require('../index');
const Readable = require('stream').Readable;

function readString(str) {

  const input = new Readable();

  input.push(str);
  input.push(null);

  return input;
}

describe('csv2json', () => {

  it('Basic', async () => {

    const json = await readCSVasJson(readString(`# comments
    col1,col2,col3
    text1,text2,text3
    textr21,textr22,"textr23 ,test3 """
    textr31,textr32,textr33,adsfasdf,asdfasdf
    textr21,textr22,"textr23 ,test3 "" ,asdfasdfasdf"
    `));

    expect(json).toMatchObject([
      {col1: "text1", col2: "text2", col3: "text3"},
      {col1: "textr21", col2: "textr22", col3: "textr23 ,test3 \""},
      {col1: "textr31", col2: "textr32", col3: "textr33"},
      {col1: "textr21", col2: "textr22", col3: "textr23 ,test3 \" ,asdfasdfasdf"},
    ]);

  });
});