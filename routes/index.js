var express = require('express');
var router = express.Router();
const jsonfile = require('jsonfile');
const STOREJSON = __dirname+"/scanResult.json";
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/getAllResults', function(req, res, next) {
  res.json(jsonfile.readFileSync(STOREJSON));
});

router.get('/clean', function(req, res, next) {
  jsonfile.writeFileSync(STOREJSON, []);
  res.json({result:true});
});

function _getIndexById(ID){
  let data = jsonfile.readFileSync(STOREJSON);
  let indexResult = -1;
  data.forEach((data, index)=>{
    if(data.ID == ID){
      indexResult = index;
    }
  });
  return indexResult;
}

router.get('/deleteById', function(req, res, next) {
  let ID = req.query.ID;
  let data = jsonfile.readFileSync(STOREJSON);
  let index = _getIndexById(ID);
  data.splice(index, 1);
  jsonfile.writeFileSync(STOREJSON, data);
  res.json(data);
});



router.get('/addStarStock', function(req, res, next) {
  let stock=req.query.stock;
  let strategy = req.query.strategy;
  let time = req.query.timedate;
  let ID = `_id_${Date.parse(new Date())}`;
  let storeObj = {
    stock: stock,
    strategy: strategy,
    time: time,
    ID: ID
  };
  let oldData = jsonfile.readFileSync(STOREJSON);
  oldData.push(storeObj);
  jsonfile.writeFileSync(STOREJSON, oldData);
  res.json({result: true});
});



module.exports = router;
