export default '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" id="playpause" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="7,3 19,3 19,47 7,47" id="leftbar" /><polygon points="31,3 43,3 43,26 43,47 31,47" id="rightbar" /><animate to="7,3 19,3 19,47 7,47" class="lefttopause" id="lefttopause" xlink:href="#leftbar" attributeName="points" dur=".3s" begin="indefinite" fill="freeze" /><animate to="12,0 25,11.5 25,39 12,50" class="lefttoplay" id="lefttoplay" xlink:href="#leftbar" attributeName="points" dur=".3s" begin="indefinite" fill="freeze" /><animate to="31,3 43,3 43,26 43,47 31,47" class="righttopause" id="righttopause" xlink:href="#rightbar" attributeName="points" dur=".3s" begin="indefinite" fill="freeze" /><animate to="25,11.5 39.7,24.5 41.5,26 39.7,27.4 25,39" class="righttoplay" id="righttoplay" xlink:href="#rightbar" attributeName="points" dur=".3s" begin="indefinite" fill="freeze" /></svg>'