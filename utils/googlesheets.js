module.exports = {
    async setdata(req, res, doc) {
        const body = req.query;
        let sheet;
        if (body.id == 1) sheet = await doc.sheetsById[0];
        else if (body.id == 3) sheet = await doc.sheetsById[826236373];
        const date = new Date();
        //const rows = await sheet.getRows();
        await sheet.addRow({
            time: `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`,
            temp: body.temp, humid: body.humid,
            soil_temp: body.soil_temp,
            soil_humid: body.soil_humid,
            soil_ph: body.soil_ph,
            soil_N: body.soil_N,
            soil_P: body.soil_P,
            soil_K: body.soil_K
        })
        .then((row) => {
            console.log(row)
            res.send('ok')
        }).catch(err => {
            res.send(500);
            console.log(err);
        });
    }
}