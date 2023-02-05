const LmDB = {
	on: function(event, callback){
		if(event === 'change'){
			LmDB.__lgd_(callback)
		}
	},
	oldData: null,
	_d_: null,
	__lgd_: function(callback){
		let newData = null
		loop_()
		function loop_(){
			fetch('lmdb/data.json')
			.then(d=>d.text())
			.then(d1=>data_(d1))
			function data_(d){
				newData = d
				if(newData !== LmDB.oldData){
					callback(JSON.parse(newData))
				}
				LmDB.oldData = newData
				setTimeout(loop_, 10)
			}
		}
	},
	set: function(ref, data){
		LmDB._d_ = JSON.parse(LmDB.oldData)
		eval(`
			if(LmDB._d_.${ref} !== null){
				LmDB._d_.${ref} = ${JSON.stringify(data)}
			}else{
				console.warn('Can not Append Child to NULL')
			}
		`)
		console.log(LmDB._d_)

		fetch('lmdb/rtdb.php?data='+JSON.stringify(LmDB._d_))
		.catch(e=>console.error(e))
	},
	get: function(ref){
		console.warn('The "LmDB.get()" function is Deprecated. \n Use "LmDB.on(\'change\', function(){...})" instead.')
		return 'The "LmDB.get()" function is Deprecated. <br>Use "LmDB.on(\'change\', function(){...})" instead.'
	}
}