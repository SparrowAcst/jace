const map = {
	"default": "default.svg",
	"docx": "docx.svg",
	"flv": "flv.svg",
	"gif": "gif.svg",
	"jpg": "jpg.svg",
	"m4v": "m4v.svg",
	"mov": "mov.svg",
	"mp4": "mp4.svg",
	"ods-17": "ods-17.svg",
	"ods-21": "ods-21.svg",
	"odt": "odt.svg",
	"ott": "ott.svg",
	"pdf": "pdf.svg",
	"png": "png.svg",
	"po": "po.svg",
	"ppt": "ppt.svg",
	"psd": "psd.svg",
	"rtf": "rtf.svg",
	"svg": "svg.svg",
	"txt": "txt.svg",
	"xls": "xls.svg",
	"xlsx": "xlsx.svg"
}

export default (item) => {
		let ext = item.ext
		if(ext == "png" || ext == "gif" || ext == "icon" || ext == "jpg" || ext == "bmp"){
			if(item.url) return item.url
		} 
			
		let res = (ext) ?  map[ext] : map.default
		res = (res) ? res :  map.default

		return "modules/ext-icons/"+res
}