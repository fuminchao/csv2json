# csv2json
[![Build Status](https://travis-ci.com/fuminchao/csv2json.svg?branch=master)](https://travis-ci.com/fuminchao/csv2json)

Parse CSV into JSON Object

# Sample

Code
```
let json = await readCSVasJson(fs.createReadStream(file, {encoding: 'utf-8'}));
```

Supported CSV
```
# Comment supported
col1,col2,col3
text1,text2,text3
text1,text2,"text3 ,test3 """
```

Output JSON
```
[
  {col1: "text1", col2: "text2", col3: "text3"},
  {col1: "text1", col2: "text2", col3: "text3 ,test3 \""}
]
```
