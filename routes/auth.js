
const express = require("express");
const router = express.Router();

const part1=require("../controllers/part_one");
router.post("/post_part1",part1.part_one);
router.post("/post_sig_part1",part1.part_one_sig);

const part2=require("../controllers/part_two");
router.post("/post_part2",part2.part_two);

const part3=require("../controllers/part_three");
router.post("/post_part3",part3.part_three);

const part4=require("../controllers/part_four");
router.post("/post_part4",part4.part_four);


//========หน้า Index==============================================
const index=require("../controllers/index.js");
router.get("/",index.index)

const report=require("../controllers/report.js");
router.get("/report",report.report)

//===========INDEX_RUNPROCESS===================================
const index_runprocess = require("../controllers/index_runprocess.js")
router.get("/run_process_product/:request_id",index_runprocess.index_runprocess);
router.post("/post_sig_partone",index_runprocess.post_sig_partone);
router.post("/post_sig_parttwo",index_runprocess.post_sig_parttwo);
router.post("/post_sig_partthree",index_runprocess.post_sig_partthree);

router.post("/post_sig_partfour_mg",index_runprocess.post_sig_partfour_mg);
router.post("/post_sig_partfour_pu",index_runprocess.post_sig_partfour_pu);
router.post("/post_sig_partfour_dr",index_runprocess.post_sig_partfour_dr);

//===========Report_pr_sap_index==================================
const report_pr_sap = require("../controllers/report_pr_sap.js")
router.get("/report_pr_sap/:zzproject",report_pr_sap.report_pr_sap_index);
module.exports = router;