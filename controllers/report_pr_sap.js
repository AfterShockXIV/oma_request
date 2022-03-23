const axios = require("axios");
const { render } = require("ejs");
const report_pr_sap_index = (req, res, next) => {
    let zzproject = req.params.zzproject
    console.log(zzproject)
    const URL = "http://192.168.30.108:9001/apis/getPRPO/";
    const FetchData = async () => {
        const response = await 
        axios.get (URL, { 
        method: "GET", 
        mode: "no-cors",   
        headers: { 
        "Access-Control-Allow-Origin": "*" , 
        "Content-Type": "application / json" 
        }, 
        withCredentials: true, 
        credentials: "same-origin" 
      }); 
      let data_api = response.data.data ;
      let data_api_filter =  data_api.filter(data => data.ZZPROJECT === zzproject)
    //   console.log(data_api_filter)
      res.render("report/report_pr_sap", {  
          data_api : data_api_filter
        })
    }
    FetchData();
  
    
}
module.exports.report_pr_sap_index = report_pr_sap_index;