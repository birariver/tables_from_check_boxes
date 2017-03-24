var countries_list = ["Россия", "Болгария", "США", "Франция", "Австралия", "Нигерия", "ЮАР", "Германия", "Чехия", "Бразилия", "Чили", "Монако", "Италия", "Китай", "Монголия", "Швеция", "Дания", "Антарктида", "Луна", "Марс"]
var category_list = ["первая", "вторая","ещё одна", "последняя"]
var servers_list = ["qwer", "wert", "erty", "rtyu", "tyui", "yuio", "uiop", "iop", "asdf", "asdfg", "zxcv", "bnm", "trew", "rewq", "ewq", "tyuio", "jkghdf", "zcvb", "asfg", "yrey"]
var countries_state = ""
var category_state = ""


for (c = 0; c < servers_list.length; c++) {
		for (r = 0; r < countries_list.length; r++) {
			countries_state = countries_state + (servers_list[c].length + countries_list[r].length)%2
		}	
	}

for (c = 0; c < servers_list.length; c++) {
		for (r = 0; r < category_list.length; r++) {
			category_state = category_state + (servers_list[c].length + category_list[r].length)%2
		}	
	}


String.prototype.times = function(n) {
    return new Array(n + 1).join(this);
};

function create_table(row,col) {
	var code_result = "";
	code_head = "    <th></th>\n".times(col+1);
    code_cols = "    <td></td>\n".times(col+1);
    code_cols = ("<tr>\n" + code_cols + "</tr>\n").times(row);
    return "<tr>\n" + code_head + "</tr>\n" + code_cols

}

function filling_table(tbl,rows_name,cols_name,state) {
    var rl = rows_name.length;
    var cl = cols_name.length;

	for (r = 1; r <= rl; r++) {
		tbl.rows[r].cells[0].innerHTML = rows_name[r-1];
	}

	for (c = 1; c <= cl; c++) {
		tbl.rows[0].cells[c].innerHTML = cols_name[c-1];
	}

	for (c = 1; c <= cl; c++) {
		for (r = 1; r <= rl; r++) {
			if (!!Number(state[(r-1)*cl+c-1])) {
				
				tbl.rows[r].cells[c].innerHTML = "<input type='checkbox' name='cell'"+r+c+" checked>";
			} else {

				tbl.rows[r].cells[c].innerHTML = "<input type='checkbox' name='cell'"+r+c+">";
			}
		}	
	}
}

function read_table(tbl) {
	var state_tbl = "";
	for (r = 1; r < tbl.rows.length; r++) {
		for (c = 1; c < tbl.rows[0].cells.length; c++) {
			state_tbl = state_tbl + Number(tbl.rows[r].cells[c].children[0].checked);
		}	
	}
	return state_tbl;
}

var buttonn = document.querySelector("input[type=\"submit\"]");

var table_country = document.createElement('table');
table_country.innerHTML = create_table( countries_list.length, servers_list.length );
document.body.children[0].insertBefore(table_country, document.querySelector(".table_two_name"));
table_country.classList.add("table_country");
filling_table( table_country.children[0], countries_list, servers_list, countries_state);

var table_category = document.createElement('table');
table_category.innerHTML = create_table( category_list.length, servers_list.length );
document.body.children[0].insertBefore(table_category, buttonn);
table_category.classList.add("table_category");
filling_table( table_category.children[0], category_list, servers_list, category_state);

buttonn.addEventListener("click", function(event) {
		event.preventDefault();
		console.log(read_table(table_country));
		console.log(read_table(table_category));
	});

