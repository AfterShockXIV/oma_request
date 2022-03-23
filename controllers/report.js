const report = (req, res, next) => {
    db.query("SELECT * ,  DATEDIFF(part_one.sig_date,datepartone) as date_diff , DATE_ADD(datepartone, INTERVAL part_one.target_day DAY) as add_date from request_main inner join part_one on (request_main.partone_id = part_one.partone_id)  where request_main.request_id order by request_main.request_id DESC ", (err, result) => {
        if (err) {
            console.log(err)
        } 
        let data1 = result ; 
        console.log(result.data_partone)
        res.render("report/report.ejs", {
            data_partone: data1 
        })
    })
}
module.exports.report = report;

