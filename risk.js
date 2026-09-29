/* แท็บพื้นที่เฝ้าระวังน้ำท่วม — ระบายสีรายเขต/อำเภอ กทม. และปริมณฑล จากข้อมูลสด */
(function(){
const DIST=[["1105","พระสมุทรเจดีย์","11",[[100589,13590,-6,-9,-5,-21,12,-17,-11,-22,-21,-15,-56,-5,-11,-6,-25,-3,-8,-5,-13,66,1,33,9,19,12,-1,0,-7,3,-4,3,2,4,7,5,-8,12,-6,5,7,13,3,2,5,7,2,6,-6,24,20,20,-8,15,0,6,-7]]],["1106","บางเสาธง","11",[[100846,13640,-9,-18,5,-7,0,-12,-10,-24,-10,-5,10,-1,-4,-7,-18,5,-7,-10,-6,6,-7,-19,-27,9,12,39,4,-1,7,20,-3,33,11,18,-4,11,-27,-2,22,32,-3,3,3,6,71,-16,13,-6,-10,-4,0,-18,-11,-19,5,-8]]],["1103","บางพลี","11",[[100775,13596,-12,-39,8,-3,-10,-32,-59,10,6,13,-10,41,-24,-2,2,7,-9,14,4,9,-42,15,14,24,5,-1,8,20,37,-15,0,-6,5,4,13,41,-1,22,75,-2,-3,-6,3,-3,-22,-32,27,2,4,-11,-11,-18,3,-33,-7,-20]]],["1104","พระประแดง","11",[[100527,13599,-6,6,-6,17,0,6,2,6,-1,5,6,4,1,14,0,5,-6,7,0,3,4,8,16,-11,9,3,5,8,2,8,-2,12,4,6,24,-7,9,-8,1,-5,-10,-18,13,-4,1,-15,-6,-17,-13,1,-5,4,-28,-27]]],["1101","เมืองสมุทรปราการ","11",[[100777,13521,10,-8,-7,-21,-64,9,-84,20,-14,12,-5,-6,-23,16,-12,17,5,21,6,9,3,14,-6,7,-15,0,-20,8,18,18,5,-4,13,-1,6,17,-1,15,51,-11,-14,-24,42,-15,-4,-9,9,-14,-2,-7,24,2,10,-41,-6,-13]]],["1102","บางบ่อ","11",[[100879,13546,-7,-22,0,-33,-20,-7,-4,-6,-68,14,7,21,-10,8,-16,1,10,32,19,-6,7,19,6,-6,7,10,18,-5,4,7,-10,1,10,5,10,24,0,12,-5,7,9,18,7,5,-5,8,11,19,0,18,10,4,86,-31,-1,-13,9,-5,-3,-12,-37,-39,-16,-2,0,-11,8,-10,-11,-16,-14,10]]],["1042","สายไหม","10",[[100684,13912,8,-14,0,-11,-8,-13,-3,6,-20,-1,-8,7,0,-3,-13,4,-17,-4,-14,5,0,8,14,24,2,17,15,-3,0,-2,50,-2,-2,-12]]],["1043","คันนายาว","10",[[100671,13853,13,-5,21,-50,-30,-17,-1,15,-11,14,-1,21,-5,5,-8,-2,1,12,9,2,4,8,12,1]]],["1040","บางแค","10",[[100425,13732,3,-44,-36,-19,-7,2,-8,30,-24,51,60,-4,5,-17]]],["1041","หลักสี่","10",[[100595,13888,-7,-9,-2,-20,-43,-9,16,64,29,-15,-5,-8]]],["1048","ทวีวัฒนา","10",[[100411,13802,-5,-53,-53,3,6,-14,-24,-3,-1,18,-5,12,2,24,-3,15]]],["1049","ทุ่งครุ","10",[[100521,13643,-5,-4,1,-5,-2,-6,2,-14,4,-9,-7,-2,-2,-5,-13,-3,-5,-7,-12,6,-5,8,5,13,-10,9,3,11,-5,24,6,3,15,-5,2,3,4,-1,2,-5,4,6,9,-3,11,4]]],["1046","คลองสามวา","10",[[100730,13837,0,-6,-8,0,-2,6,0,-7,-5,0,1,-8,-19,-7,-13,33,-13,5,9,6,4,15,8,13,0,11,-8,14,4,6,59,-1,46,12,0,-35,3,-4,-8,-10,12,-31,-51,-27,-6,13]]],["1047","บางนา","10",[[100624,13685,2,-7,14,0,5,-8,9,-1,-6,-17,-69,16,10,15,11,-3]]],["1044","สะพานสูง","10",[[100710,13756,-2,-24,-49,6,7,9,13,5,-9,4,-5,19,40,23,11,-20,-9,-21]]],["1045","วังทองหลาง","10",[[100603,13800,3,-5,6,0,3,5,9,0,2,-12,3,1,1,-26,-15,-2,-11,-10,-9,13,-7,39]]],["1050","บางบอน","10",[[100447,13683,-70,-62,-5,0,-5,13,-21,6,-1,2,-1,13,41,16,7,-2,46,25]]],["1020","บางกอกน้อย","10",[[100488,13748,-17,-5,-9,1,-9,22,4,10,10,4,-1,7,3,1,22,-26]]],["1021","บางขุนเทียน","10",[[100465,13656,5,3,5,-24,-3,-11,10,-9,-9,-20,-3,-2,-3,4,0,7,-12,1,-9,-19,-1,-33,13,-66,-47,4,-4,15,0,29,9,5,3,6,-4,10,-15,-3,-6,4,-3,11,-5,7,-2,14,-5,5,-2,27,70,62,2,-8,3,0,-1,-14]]],["1028","สาทร","10",[[100544,13707,-15,-1,1,-4,-15,3,1,3,-8,4,4,7,33,7,8,-3,1,-6,-5,2,-7,-8]]],["1029","บางซื่อ","10",[[100537,13822,8,-4,-7,-20,-21,2,-2,13,-8,4,2,7,4,1,31,25]]],["1026","ดินแดง","10",[[100575,13801,-2,-31,-8,-15,-13,1,-9,7,5,1,13,31]]],["1027","บึงกุ่ม","10",[[100650,13846,-1,-12,8,2,5,-5,1,-21,11,-14,1,-15,-19,-10,-8,14,-5,2,-12,32,-7,-2,12,27]]],["1024","ราษฎร์บูรณะ","10",[[100512,13657,-9,3,-4,-6,-2,5,-4,1,-2,-3,-15,5,6,3,-2,4,9,10,-1,6,-7,5,2,5,7,0,10,-8,21,-7,-4,-10,6,-9]]],["1025","บางพลัด","10",[[100491,13762,-25,27,28,9,21,15,2,-13]]],["1022","ภาษีเจริญ","10",[[100460,13713,-5,-1,1,-4,-3,2,-3,-5,-12,5,-4,-10,4,-6,-10,-6,-3,44,-7,-1,-5,17,19,-8,30,4,2,-13,8,-8,-3,-7,-6,2]]],["1023","หนองแขม","10",[[100377,13701,8,-30,-41,-16,-5,0,2,6,-7,20,-3,17,5,7,1,11,-2,19,24,3]]],["1019","ตลิ่งชัน","10",[[100462,13744,-30,-4,-26,9,5,53,53,-5,6,-2,-4,-6,1,-9,-10,-4,-4,-10]]],["1031","บางคอแหลม","10",[[100515,13705,15,-3,1,-3,-13,-17,-18,5,-10,8,18,17,8,-4]]],["1032","ประเวศ","10",[[100712,13701,-14,-46,-5,-4,0,6,-26,11,-11,4,-2,-3,-9,1,-5,8,-6,23,17,2,-1,26,9,9,49,-6]]],["1030","จตุจักร","10",[[100590,13844,-2,-41,-13,-2,-14,-6,-23,3,7,20,-8,4,7,28,42,9]]],["1039","วัฒนา","10",[[100605,13738,1,-23,-4,-3,4,-5,-4,-2,-17,15,-34,23,-1,5,48,-7]]],["1037","ราชเทวี","10",[[100563,13748,-38,1,-6,4,9,21,24,-18,13,-1]]],["1038","ลาดพร้าว","10",[[100636,13844,-24,-49,-6,0,-3,5,-15,3,2,41,29,5,10,-6]]],["1035","จอมทอง","10",[[100488,13685,1,-6,-9,-10,2,-4,-17,-9,-14,5,1,14,-3,0,0,7,-15,18,4,10,12,-5,3,5,3,-2,-1,4,5,1,3,5,6,-2,-3,-7,11,0,6,-14,-2,-5]]],["1036","ดอนเมือง","10",[[100608,13943,-1,11,17,-7,1,-10,-2,-17,-14,-24,-14,-8,-12,3,5,8,-29,15,9,37,9,4]]],["1033","คลองเตย","10",[[100602,13705,-19,-8,-11,6,-17,3,-4,37,34,-23]]],["1034","สวนหลวง","10",[[100659,13738,-9,-9,1,-26,-17,-2,-2,4,-26,2,-4,5,4,3,-1,23,-7,3,3,7,10,-4,25,6]]],["1006","บางกะปิ","10",[[100666,13747,-7,-9,-23,12,-25,-6,-10,4,14,13,15,2,-1,26,-3,-1,-2,12,-9,0,9,17,7,2,12,-32,5,-2,8,-14,9,4,5,-19,9,-4]]],["1007","ปทุมวัน","10",[[100550,13748,3,-25,-37,15,1,15,8,-4]]],["1004","บางรัก","10",[[100516,13738,29,-12,-33,-7,0,10,3,3]]],["1005","บางเขน","10",[[100653,13883,0,3,8,-7,20,1,3,-6,-4,-15,-17,-3,-4,-8,-30,-5,-10,6,-29,-5,-4,15,2,20,7,9,14,8,0,-8,14,-5,17,4]]],["1002","ดุสิต","10",[[100538,13798,-19,-45,-2,0,-1,4,-17,16,7,14,11,13]]],["1003","หนองจอก","10",[[100878,13738,-10,13,-7,19,-18,1,-5,-3,-6,0,-17,16,-21,0,1,10,13,14,-6,3,-1,9,5,6,2,27,-8,-4,-12,31,8,10,-3,4,0,35,119,16,-7,-96,8,-3,-6,-7,31,-24,-7,-10,-24,-18]]],["1001","พระนคร","10",[[100500,13739,-7,2,-5,7,1,12,10,13,10,-9]]],["1010","มีนบุรี","10",[[100743,13835,6,-13,59,31,-2,-27,-5,-6,1,-9,6,-3,-13,-14,-6,6,-6,-1,0,-17,-14,0,-9,-6,-14,2,0,-4,-7,0,0,3,-6,-2,-17,3,-19,37,19,7,-1,8,5,0,0,7,2,-6,8,0,0,6]]],["1017","ห้วยขวาง","10",[[100604,13751,-6,-10,-35,7,10,22,2,31,13,2,7,-39]]],["1018","คลองสาน","10",[[100499,13705,-6,16,6,18,10,-4,3,-6,0,-10,-4,-7]]],["1015","ธนบุรี","10",[[100499,13705,-9,-10,-7,0,-6,14,-11,0,6,14,7,0,7,5,6,14,7,-3,-6,-18]]],["1016","บางกอกใหญ่","10",[[100492,13742,-6,-14,-7,-5,-7,0,-8,8,-2,13,9,-1,17,5]]],["1013","สัมพันธวงศ์","10",[[100515,13732,-3,-3,-3,6,-9,4,4,8,12,-9]]],["1014","พญาไท","10",[[100561,13795,-13,-31,-5,-1,-15,11,10,24]]],["1011","ลาดกระบัง","10",[[100832,13768,6,0,5,3,18,-1,7,-19,10,-13,-22,-38,-68,16,-78,2,0,38,-3,1,9,21,17,-3,6,2,0,-3,7,0,0,4,14,-2,9,6,14,0,0,17,6,1,6,-6,-1,-10,21,0]]],["1012","ยานนาวา","10",[[100537,13669,-9,4,-10,9,13,17,-2,7,15,1,-2,4,7,8,5,-2,1,-11,-4,-6,2,-12,-2,-8,-5,-8]]],["1008","ป้อมปราบศัตรูพ่าย","10",[[100516,13738,-12,9,5,17,8,-11]]],["1009","พระโขนง","10",[[100632,13705,8,-27,-14,0,-2,7,-24,-5,-11,3,-1,8,-5,6,23,10]]],["7301","เมืองนครปฐม","73",[[100099,13766,4,-38,-3,-1,7,-23,-40,-8,-35,-2,-8,12,-2,16,1,14,7,12,-2,6,-28,-15,-5,2,-34,-19,-19,23,-4,25,15,5,4,21,12,2,0,12,-6,4,-5,22,-16,-5,-6,2,0,9,-28,5,-8,-6,11,28,-6,30,-9,4,28,17,2,18,12,-1,12,8,13,-10,6,6,14,-22,32,-22,6,2,5,-7,-6,-3,13,-3,9,3,0,9,-5,3,1,9,20,3,14,-11,3,-9,16,-4,5,-9,-6,-5,26,-5,15,-20,-7,-42,-18,-23]]],["7302","กำแพงแสน","73",[[100018,13943,7,-5,5,3,3,-4,3,3,8,-6,3,2,0,-5,5,3,1,-4,2,5,3,-22,-20,-3,-1,-9,5,-3,0,-9,-9,-3,-13,3,6,3,-5,7,-6,-2,-32,22,-14,22,-6,-6,-13,10,-12,-8,-39,4,-12,3,-11,18,-14,5,-9,-3,-13,21,-10,13,7,14,-3,5,3,14,12,12,0,9,-15,9,-13,0,-2,12,34,6,17,-6,15,18,8,-1,33,37,4,-3,10,2,4,9,23,-4,4,3,-5,5,8,4,3,-4,8,0,3,5,18,-4,9,7,28,5,6,0,3,-6,12,-1,0,-20,4,-6,-6,-2,0,-6,8,-14,-9,-7,3,-18,-3,-1,0,-17,-10,-2,7,-19,6,-1,-5,-11,3,-8,1,-18,-3,3,-2,-5,6,-2,-12,-5,-12,-1,-4,-11,-9,4,-8,-7,-1,-10,-7,-2,3,-4,7,3,1,-11]]],["7307","พุทธมณฑล","73",[[100330,13801,-1,-36,-18,2,1,26,-29,4,-3,4,-43,4,0,6,7,4,2,13,18,1,4,35,-12,40,13,1,6,-3,6,-12,5,3]]],["7305","บางเลน","73",[[100262,13998,13,-17,23,-18,-34,-42,11,-7,11,-21,-5,-3,-6,12,-6,3,-13,-1,-23,-5,-67,27,1,4,-43,28,-5,6,-4,-2,-7,5,-5,-2,2,18,-7,16,11,13,1,21,5,1,1,7,-20,10,-7,-12,-10,2,-3,-6,-12,-3,-6,1,-7,19,10,2,0,17,3,1,-3,18,9,7,-8,14,0,6,6,2,-4,6,0,20,67,1,1,-9,8,8,20,1,0,5,52,28,72,-9,-7,-69,-6,-35,-7,-6,3,-15,9,-23,-4,6,-9,-24,4,-2]]],["7306","สามพราน","73",[[100120,13650,-42,0,-14,18,3,28,40,8,35,11,8,7,2,13,8,3,4,7,15,0,11,4,19,15,9,2,1,6,18,18,0,5,7,8,36,-2,3,-4,29,-4,-1,-26,20,-3,4,-16,1,-26,-13,-5,-8,1,0,4,-17,-8,-6,4,-7,-7,1,-16,-8,-2,-1,-4,-7,-6,-10,2,-3,-6,-14,-5,-3,5,-13,-7,-3,9,-13,5,-9,-8,-4,5,-8,-3,-3,6,-10,2,-7,-12,-16,7,-19,-1,-2,-6,-6,-2,-4,-22]]],["7303","นครชัยศรี","73",[[100152,13735,-2,-13,-8,-7,-35,-11,-7,23,3,1,-4,38,7,19,18,23,7,42,-15,20,14,10,5,-4,-3,7,29,26,13,8,2,5,57,-23,23,5,12,-40,-4,-35,-18,-1,-2,-13,-7,-4,0,-6,7,-2,-7,-8,0,-5,-18,-18,-1,-6,-9,-2,-19,-15,-11,-4,-15,0,-4,-7]]],["7304","ดอนตูม","73",[[100161,13909,-29,-26,3,-7,-5,4,-14,-10,-26,5,6,5,-5,9,-16,4,-3,9,-14,11,-3,22,-2,-5,-1,4,-5,-3,0,5,-3,-2,-8,6,-3,-3,-3,4,-5,-3,-7,5,4,4,-1,11,-7,-3,-3,4,7,2,1,10,8,7,9,-4,4,11,12,1,12,5,-6,2,2,5,3,-3,-1,18,-3,8,5,11,12,3,3,6,10,-2,7,12,20,-10,-1,-7,-5,-1,-1,-21,-11,-13,7,-16,-2,-18,5,2,7,-5,4,2,5,-6,43,-28,-1,-4,10,-4,-2,-5]]],["1204","บางบัวทอง","12",[[100448,13897,0,-30,-10,4,-10,-8,-7,4,-5,11,-18,8,-8,11,-10,1,-8,13,-3,-1,-7,-29,-3,-2,-18,4,-10,38,25,29,-6,4,5,8,1,15,-5,19,6,4,8,-9,20,-3,-4,6,30,-7,40,-39,-7,-12,-3,-16,5,-1,-7,-20]]],["1205","ไทรน้อย","12",[[100331,13921,10,-38,-19,2,0,-8,-3,-1,-17,3,-5,-9,-22,44,-11,7,34,42,-23,18,-13,17,5,4,-4,2,9,24,4,-6,-9,23,-3,15,7,6,9,59,17,15,37,-11,10,-13,-12,-60,25,-56,-6,-4,5,-19,-1,-15,-5,-8,6,-4]]],["1202","บางกรวย","12",[[100494,13798,-28,-9,4,6,-6,2,-55,5,-81,2,-9,19,9,3,21,-2,1,-7,18,-2,30,18,5,-9,22,13,14,-9,20,2,8,-6,6,8,18,-22,11,9,13,-6]]],["1203","บางใหญ่","12",[[100425,13837,-22,-13,-5,9,-30,-18,-18,2,-1,7,-21,2,-9,-3,-22,47,5,9,20,-2,0,8,37,-6,3,2,7,29,3,1,8,-13,10,-1,8,-11,18,-8,5,-11,7,-4,10,8,10,-4,0,-2,-7,-8,3,-11,-17,-12]]],["1201","เมืองนนทบุรี","12",[[100502,13819,-11,-9,-18,22,-6,-8,-8,6,-20,-2,-12,6,17,12,-3,11,7,8,1,23,13,3,13,0,10,-6,6,9,8,1,51,-17,-7,-28,-30,-25,-4,-1,-2,-3,0,-5]]],["1206","ปากเกร็ด","12",[[100568,13951,-18,-73,-51,17,-8,-1,-6,-9,-10,6,-13,0,-13,-3,-1,9,-9,2,7,20,-5,1,3,16,7,12,-40,39,24,-6,19,-14,5,5,6,-1,24,-26,12,-8,9,7,14,0,11,3,5,9,17,-6]]],["7401","เมืองสมุทรสาคร","74",[[100219,13465,-139,-41,-6,32,-21,30,53,17,8,-3,6,13,29,21,10,4,3,7,-6,5,-4,15,10,5,-1,7,22,-1,-7,3,2,2,20,3,7,8,5,-4,2,7,10,2,6,9,19,-4,6,6,12,-1,6,-3,9,12,11,4,22,0,1,5,14,4,6,10,21,0,12,-5,5,-13,5,0,2,-27,5,-5,2,-14,5,-7,3,-11,6,-4,15,3,4,-10,-3,-6,-9,-5,0,-29,4,-15,-68,-7,-25,4,-24,12,-24,-18]]],["7402","กระทุ่มแบน","74",[[100265,13607,-12,1,-6,-6,-19,4,-2,15,-9,-1,-4,6,3,3,13,-2,3,14,-2,3,-10,-6,-15,5,2,10,-17,5,-20,18,7,12,10,-2,3,-6,8,3,4,-5,9,8,13,-5,3,-9,13,7,3,-5,14,5,3,6,10,-2,7,6,1,4,8,2,-1,16,7,7,6,-4,17,8,0,-4,8,-1,13,5,1,-10,-1,-7,-5,-5,0,-9,10,-30,-2,-5,6,-2,1,-14,-12,-1,-6,-10,-14,-4,-1,-5,-22,0,-11,-4,-9,-12]]],["7403","บ้านแพ้ว","74",[[100120,13513,-6,-13,-8,3,-53,-17,-11,18,-13,4,0,21,15,11,-2,17,-6,25,6,15,-10,15,20,7,0,9,5,6,3,26,4,8,14,-18,42,0,3,2,4,22,6,2,2,6,19,1,16,-7,20,-18,17,-5,-2,-10,2,0,13,-5,10,6,2,-3,-3,-14,-13,2,-3,-3,4,-6,9,1,2,-15,-6,-9,-10,-2,-2,-7,-5,4,-7,-8,-20,-3,-2,-2,7,-3,-22,1,1,-7,-10,-5,4,-15,6,-5,-3,-7,-10,-4]]],["1303","ธัญบุรี","13",[[100606,13965,-4,31,74,13,80,34,158,56,0,-32,-114,-40,0,3,-94,-36,-10,-7,-33,-6]]],["1304","หนองเสือ","13",[[100914,14099,-158,-56,-1,168,137,64,0,-31,60,28,-6,-23,1,-12,-33,-16]]],["1301","เมืองปทุมธานี","13",[[100590,14074,18,-131,-31,12,-20,-5,-17,6,-5,-9,-11,-3,-14,0,-9,-7,-12,8,-24,26,-6,1,7,5,3,21,-22,12,11,18,21,-9,8,0,9,20,-1,9,28,-16,21,-2,12,11,8,-3,16,2,6,6,-1,29]]],["1302","คลองหลวง","13",[[100676,14009,-74,-13,-21,131,26,9,13,-7,0,14,135,68,1,-168]]],["1307","สามโคก","13",[[100556,14041,-12,-11,-21,2,-28,16,-14,12,-1,11,-28,17,-28,12,-2,14,34,3,10,-5,16,0,13,3,22,14,11,-8,13,-4,9,-6,4,0,-2,7,29,9,9,-53,-5,1,1,-29,-6,-6,-16,-2]]],["1305","ลาดหลุมแก้ว","13",[[100454,13967,-19,14,-54,13,4,-6,-20,3,-8,9,-25,56,12,60,39,-1,0,18,11,-1,-1,-11,5,-6,24,-1,2,-14,28,-12,28,-17,1,-11,14,-12,1,-9,-9,-20,-8,0,-21,9,-11,-18,22,-12,-3,-21]]],["1306","ลำลูกกา","13",[[100747,13917,-59,1,2,12,-50,2,0,2,-15,3,-2,11,-16,6,-1,11,57,16,33,6,10,7,94,36,0,-3,114,40,-2,-122,-119,-16]]]]; // [amp_code, ชื่อ, pro_code, [ring: x0,y0,dx,dy,... (x1000)]]
const PROV={"10":"กรุงเทพมหานคร","11":"สมุทรปราการ","12":"นนทบุรี","13":"ปทุมธานี","73":"นครปฐม","74":"สมุทรสาคร"};
const TW="https://api-v3.thaiwater.net/api/v1/thaiwater30/public/";
const API={wl:TW+"waterlevel_load", rain:TW+"rain_24h", events:"https://event.longdo.com/feed/json"};
const LEAF="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/";
const REFRESH_MS=10*60*1000, STALE_MS=2*3600e3;
const LV=[
  {name:"ปกติ",       color:"#9fb88a", op:.18, txt:"#3d5a2a"},
  {name:"เฝ้าระวัง",    color:"#f2c94c", op:.55, txt:"#7a5a00"},
  {name:"เฝ้าระวังสูง", color:"#f2892e", op:.6,  txt:"#8a4300"},
  {name:"เตือนภัย",    color:"#d7301f", op:.62, txt:"#a3200f"},
  {name:"วิกฤต",      color:"#6a0f5c", op:.7,  txt:"#6a0f5c"}
];

// ---------- geometry ----------
const AREAS=DIST.map(([code,name,pro,rings])=>{
  const rs=rings.map(d=>{const pts=[]; let x=d[0],y=d[1]; pts.push([x/1000,y/1000]); for(let i=2;i<d.length;i+=2){x+=d[i];y+=d[i+1];pts.push([x/1000,y/1000]);} return pts;});
  let sx=0,sy=0,n=0; rs.forEach(r=>r.forEach(([x,y])=>{sx+=x;sy+=y;n++}));
  let bb=[180,90,-180,-90]; rs.forEach(r=>r.forEach(([x,y])=>{bb=[Math.min(bb[0],x),Math.min(bb[1],y),Math.max(bb[2],x),Math.max(bb[3],y)]}));
  return {code,name,pro,provName:PROV[pro],rings:rs,cx:sx/n,cy:sy/n,bb};
});
function inRing(r,x,y){let c=false; for(let i=0,j=r.length-1;i<r.length;j=i++){const [xi,yi]=r[i],[xj,yj]=r[j]; if(((yi>y)!==(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi)) c=!c;} return c;}
function areaOf(lng,lat){ for(const a of AREAS){ if(lng<a.bb[0]||lng>a.bb[2]||lat<a.bb[1]||lat>a.bb[3]) continue; if(a.rings.some(r=>inRing(r,lng,lat))) return a; } return null; }
function km(ax,ay,bx,by){const dx=(ax-bx)*108.5, dy=(ay-by)*110.6; return Math.sqrt(dx*dx+dy*dy);}

// responsible units from the area-assignment tab (if present)
function unitsFor(a){
  try{
    if(typeof ROWS==="undefined") return null;
    const n=a.name.replace(/^เขต/,"");
    const r=ROWS.find(r=>r.prov===a.provName && r.dist.replace(/^เขต/,"")===n);
    return r?{plan:r.plan,unit:r.unit}:null;
  }catch(e){return null}
}

// ---------- styles ----------
const css=`
.tabs{overflow-x:auto;scrollbar-width:none}.tabs::-webkit-scrollbar{display:none}
.tabs .tab{white-space:nowrap;flex:none}
.rk-sum{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin-top:12px}
.rk-lv{border-radius:10px;padding:8px 10px;border:1px solid var(--line);background:var(--surface);cursor:pointer;text-align:left;font:inherit;color:var(--ink)}
.rk-lv b{display:block;font-family:"IBM Plex Mono",monospace;font-variant-numeric:tabular-nums;font-size:22px;line-height:1.2}
.rk-lv span{font-size:12.5px;display:flex;align-items:center;gap:6px}
.rk-lv i{width:11px;height:11px;border-radius:3px;display:inline-block;flex:none}
.rk-lv[aria-pressed="true"]{outline:2px solid var(--ink);outline-offset:-1px}
.rk-bar{display:flex;flex-wrap:wrap;gap:8px 14px;align-items:center;justify-content:space-between;padding-block:12px 8px;font-size:14px;color:var(--muted)}
.rk-bar strong{color:var(--ink)}
.rk-btn{font:inherit;font-size:14px;border:1px solid var(--line);background:var(--surface);color:var(--ink);padding:5px 12px;border-radius:8px;cursor:pointer}
.rk-tg{font:inherit;font-size:13.5px;border:1px solid var(--line);background:var(--chip);color:var(--ink);padding:4px 11px;border-radius:999px;cursor:pointer}
.rk-tg[aria-pressed="true"]{background:var(--accent);color:var(--accent-ink);border-color:var(--accent)}
.rk-lv:focus-visible,.rk-btn:focus-visible,.rk-tg:focus-visible,.rk-row:focus-visible{outline:2px solid var(--accent);outline-offset:2px}
#rk-map{height:min(62vh,560px);border:1px solid var(--line);border-radius:12px;overflow:hidden;background:var(--chip);z-index:0}
.rk-crit{font-size:12.5px;color:var(--muted);margin-top:8px;line-height:1.6}
.rk-h{font-size:17px;margin:22px 0 4px;padding-bottom:6px;border-bottom:2px solid var(--ink)}
.rk-row{display:grid;grid-template-columns:6px minmax(0,1fr) auto;gap:2px 12px;padding:10px 0;border-bottom:1px solid var(--line);align-items:center;cursor:pointer}
.rk-row:hover .rk-name{text-decoration:underline}
.rk-stripe{align-self:stretch;border-radius:3px}
.rk-name{font-weight:600;font-size:16px}
.rk-name small{font-weight:400;color:var(--muted);font-size:13px;margin-left:6px}
.rk-why{font-size:13px;color:var(--muted);font-variant-numeric:tabular-nums}
.rk-unit{font-size:13px;color:var(--ink);margin-top:2px}
.rk-pill{font-size:12.5px;font-weight:600;padding:2px 9px;border-radius:999px;white-space:nowrap;color:#fff}
.rk-err{padding:12px 14px;color:var(--bad);background:var(--bad-bg);border-radius:10px;margin-top:10px;font-size:14px}
.rk-src{font-size:12.5px;color:var(--muted);margin-top:16px;line-height:1.6}
.rk-pop b{font-size:15px}.rk-pop div{font-size:13px;line-height:1.5}
@media (max-width:560px){.rk-sum{grid-template-columns:repeat(5,minmax(0,1fr));gap:4px}.rk-lv{padding:6px}.rk-lv b{font-size:18px}.rk-lv span{font-size:11px}.rk-lv i{display:none}}
`;
const st=document.createElement("style"); st.textContent=css; document.head.appendChild(st);

// ---------- DOM ----------
const tabs=document.querySelector(".tabs");
const btn=document.createElement("button");
btn.className="tab"; btn.type="button"; btn.id="tab-risk"; btn.setAttribute("role","tab"); btn.setAttribute("aria-selected","false");
btn.innerHTML='เฝ้าระวังน้ำท่วม<small>สด</small>';
tabs.appendChild(btn);

const view=document.createElement("main");
view.className="wrap"; view.id="view-risk"; view.hidden=true;
view.innerHTML=`
  <div class="rk-sum" id="rk-sum"></div>
  <div class="rk-bar">
    <div id="rk-status">กำลังโหลดข้อมูล…</div>
    <div style="display:flex;gap:6px;flex-wrap:wrap">
      <button class="rk-tg" type="button" data-s="" aria-pressed="true">ทั้งหมด</button>
      <button class="rk-tg" type="button" data-s="10" aria-pressed="false">กทม.</button>
      <button class="rk-tg" type="button" data-s="x" aria-pressed="false">ปริมณฑล</button>
      <button class="rk-btn" type="button" id="rk-reload">โหลดใหม่</button>
    </div>
  </div>
  <div id="rk-map" role="region" aria-label="แผนที่พื้นที่เฝ้าระวังน้ำท่วม"></div>
  <p class="rk-crit"><b>เกณฑ์ระดับ</b> (ประเมินจากข้อมูล 3 ชม.ล่าสุด เลือกระดับสูงสุดที่เข้าเกณฑ์):
    <b style="color:${LV[1].txt}">เฝ้าระวัง</b> ฝน 24 ชม. ≥10 มม. ·
    <b style="color:${LV[2].txt}">เฝ้าระวังสูง</b> ฝน ≥35 มม. หรือมีรายงานน้ำท่วม 1–2 จุด หรือคลองเกินตลิ่ง ·
    <b style="color:${LV[3].txt}">เตือนภัย</b> ฝน ≥90 มม. หรือรายงาน 3–5 จุด ·
    <b style="color:${LV[4].txt}">วิกฤต</b> รายงาน ≥6 จุด · ถ้าคลองเกินตลิ่งร่วมกับมีรายงานน้ำท่วมหรือฝนหนัก เพิ่มอีก 1 ระดับ</p>
  <div id="rk-msg"></div>
  <h3 class="rk-h">เขต/อำเภอที่ต้องเฝ้าระวัง</h3>
  <div id="rk-list"></div>
  <p class="rk-src">ระดับในหน้านี้คำนวณอัตโนมัติจากข้อมูลสด ไม่ใช่ประกาศเตือนภัยทางการ · รายงานน้ำท่วม: ผู้ใช้ถนนผ่าน Longdo Traffic (ยังไม่ผ่านการยืนยัน) · ฝนและระดับน้ำ: คลังข้อมูลน้ำแห่งชาติ (ThaiWater, สสน.) · ขอบเขตอำเภอ: OpenGISData-Thailand · แผนที่ © OpenStreetMap contributors · อัปเดตอัตโนมัติทุก 10 นาที</p>`;
(document.getElementById("view-water")||document.getElementById("view-kitchen")).after(view);

const $=id=>view.querySelector("#"+id);
const searchBox=document.querySelector(".search"), chips=document.getElementById("chips");

function showRisk(on){
  btn.setAttribute("aria-selected",on);
  view.hidden=!on;
  if(on){
    ["area","kitchen","water"].forEach(t=>{const b=document.getElementById("tab-"+t), v=document.getElementById("view-"+t); if(b) b.setAttribute("aria-selected","false"); if(v) v.hidden=true;});
    searchBox.hidden=true; chips.hidden=true;
    document.getElementById("eyebrow").textContent="ทภ.1 · ประเมินจากข้อมูลสด กทม. และปริมณฑล";
    document.getElementById("title").textContent="พื้นที่เฝ้าระวังน้ำท่วม";
    start();
  }
}
btn.addEventListener("click",()=>{showRisk(true);window.scrollTo(0,0)});
["area","kitchen","water"].forEach(t=>{const b=document.getElementById("tab-"+t); if(b) b.addEventListener("click",()=>{ if(!view.hidden){ showRisk(false); if(t!=="water"){searchBox.hidden=false; chips.hidden=false;} } },true)});

// ---------- data ----------
const num=v=>{const n=parseFloat(v);return isFinite(n)?n:null};
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function bkkTime(s){const m=/(\d+)-(\d+)-(\d+)[ T](\d+):(\d+)/.exec(s||""); return m?Date.UTC(+m[1],m[2]-1,+m[3],m[4]-7,+m[5]):null}
const fmtTime=t=>new Date(t).toLocaleString("th-TH",{timeZone:"Asia/Bangkok",day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})+" น.";
async function getJSON(u,ms=25000){const c=new AbortController(); const to=setTimeout(()=>c.abort(),ms); try{const r=await fetch(u,{cache:"no-store",signal:c.signal}); if(!r.ok) throw new Error("HTTP "+r.status); return await r.json()} finally{clearTimeout(to)}}

let stats=new Map(), map=null, L_=null, geo=null, polys={}, scope="", lvFilter=null, loading=false, updated=null;

function level(s){
  const rep=s.reports.length, rain=s.rain==null?0:s.rain;
  const rl=rep>=6?4:rep>=3?3:rep>=1?2:0;
  const nl=rain>=90?3:rain>=35?2:rain>=10?1:0;
  let lv=Math.max(rl,nl);
  if(s.over>0){ lv=Math.max(lv,2); if(rep>0||rain>=35) lv=Math.min(4,lv+1); }
  return lv;
}

async function load(){
  if(loading) return; loading=true; $("rk-reload").textContent="กำลังโหลด…";
  const errs=[], now=Date.now(), WIN=3*3600e3;
  const S=new Map(AREAS.map(a=>[a.code,{a,reports:[],rain:null,rainSt:null,over:0,overSt:[]}]));
  const [ev,rn,wl]=await Promise.all([
    getJSON(API.events,30000).catch(e=>{errs.push("รายงานน้ำท่วม");return null}),
    getJSON(API.rain).catch(e=>{errs.push("ฝน");return null}),
    getJSON(API.wl).catch(e=>{errs.push("ระดับน้ำคลอง");return null})
  ]);
  if(ev) ev.forEach(e=>{
    if(e.type!=="6") return; const t=bkkTime(e.start); if(!t||now-t>WIN) return;
    const lat=num(e.latitude), lng=num(e.longitude); if(!lat||!lng) return;
    const a=areaOf(lng,lat); if(a) S.get(a.code).reports.push({title:e.title,t});
  });
  if(rn){
    const st=(rn.data||[]).map(x=>({name:x.station&&x.station.tele_station_name&&x.station.tele_station_name.th, lat:num(x.station&&x.station.tele_station_lat), lng:num(x.station&&x.station.tele_station_long), mm:num(x.rain_24h), t:bkkTime(x.rainfall_datetime)}))
      .filter(r=>r.lat&&r.lng&&r.mm!=null&&r.t&&now-r.t<6*3600e3&&r.lng>99.8&&r.lng<101.2&&r.lat>13.2&&r.lat<14.4);
    st.forEach(r=>{const a=areaOf(r.lng,r.lat); if(a){const s=S.get(a.code); if(s.rain==null||r.mm>s.rain){s.rain=r.mm;s.rainSt=r.name}}});
    // districts without a gauge: nearest gauge within 6 km of centre
    S.forEach(s=>{ if(s.rain!=null) return; let best=null,bd=6; st.forEach(r=>{const d=km(r.lng,r.lat,s.a.cx,s.a.cy); if(d<bd){bd=d;best=r}}); if(best){s.rain=best.mm; s.rainSt=best.name+" (ใกล้เคียง)"} });
  }
  if(wl) ((wl.waterlevel_data&&wl.waterlevel_data.data)||[]).forEach(x=>{
    const t=bkkTime(x.waterlevel_datetime), pct=num(x.storage_percent); if(!t||now-t>STALE_MS||pct==null||pct<100) return;
    const lat=num(x.station&&x.station.tele_station_lat), lng=num(x.station&&x.station.tele_station_long); if(!lat||!lng) return;
    const a=areaOf(lng,lat); if(a){const s=S.get(a.code); s.over++; s.overSt.push((x.station.tele_station_name&&x.station.tele_station_name.th)+" "+pct.toFixed(0)+"%")}
  });
  S.forEach(s=>{s.lv=level(s); s.units=unitsFor(s.a)});
  stats=S; updated=now; loading=false; $("rk-reload").textContent="โหลดใหม่";
  $("rk-msg").innerHTML=errs.length?`<div class="rk-err">โหลดบางส่วนไม่สำเร็จ: ${errs.join(", ")} ระดับที่แสดงอาจต่ำกว่าจริง ลองกด “โหลดใหม่”</div>`:"";
  render();
}

function inScope(s){ return !scope || (scope==="10"?s.a.pro==="10":s.a.pro!=="10"); }
function why(s){
  const p=[];
  if(s.reports.length) p.push(`รายงานน้ำท่วม ${s.reports.length} จุด`);
  if(s.rain!=null) p.push(`ฝน 24 ชม. ${s.rain.toFixed(0)} มม.`);
  if(s.over) p.push(`คลองเกินตลิ่ง ${s.over} สถานี`);
  return p.join(" · ")||"ไม่มีสัญญาณ";
}
function popup(s){
  const L=LV[s.lv];
  return `<div class="rk-pop"><b>${s.a.pro==="10"?"เขต":"อ."}${esc(s.a.name)}</b> · ${esc(s.a.provName)}
    <div><b style="color:${L.txt}">${L.name}</b></div>
    <div>${s.reports.length?`รายงานน้ำท่วม ${s.reports.length} จุด (3 ชม.): ${s.reports.slice(0,4).map(r=>esc(r.title.replace(/^น้ำท่วม\s*/,""))).join(", ")}${s.reports.length>4?" …":""}`:"ไม่มีรายงานน้ำท่วมใน 3 ชม."}</div>
    <div>${s.rain!=null?`ฝน 24 ชม. ${s.rain.toFixed(1)} มม. (${esc(s.rainSt)})`:"ไม่มีข้อมูลฝน"}</div>
    ${s.over?`<div>คลองเกินตลิ่ง: ${s.overSt.map(esc).join(", ")}</div>`:""}
    ${s.units?`<div style="margin-top:4px">หน่วยรับผิดชอบ: <b>${esc(s.units.unit)}</b> (${esc(s.units.plan)})</div>`:""}</div>`;
}

function render(){
  const all=[...stats.values()], vis=all.filter(inScope);
  // summary tiles
  const cnt=[0,0,0,0,0]; vis.forEach(s=>cnt[s.lv]++);
  $("rk-sum").innerHTML=[4,3,2,1,0].map(i=>`<button class="rk-lv" type="button" data-lv="${i}" aria-pressed="${lvFilter===i}"><b style="color:${LV[i].txt}">${cnt[i]}</b><span><i style="background:${LV[i].color}"></i>${LV[i].name}</span></button>`).join("");
  $("rk-status").innerHTML=updated?`<strong>${vis.filter(s=>s.lv>=2).length}</strong> จาก ${vis.length} เขต/อำเภอ อยู่ระดับเฝ้าระวังสูงขึ้นไป · อัปเดต ${fmtTime(updated)}`:"กำลังโหลดข้อมูล…";
  // map
  if(map){
    all.forEach(s=>{const p=polys[s.a.code]; if(!p) return; const L=LV[s.lv], show=inScope(s);
      p.setStyle({fillColor:L.color,fillOpacity:show?L.op:0,color:show?"#ffffff":"transparent",weight:s.lv>=3?2:1,opacity:show?.9:0});
      p.setPopupContent(popup(s)); });
  }
  // list
  const list=vis.filter(s=>lvFilter==null?s.lv>=1:s.lv===lvFilter).sort((a,b)=>b.lv-a.lv||b.reports.length-a.reports.length||(b.rain||0)-(a.rain||0));
  $("rk-list").innerHTML=list.map(s=>{const L=LV[s.lv]; return `<div class="rk-row" tabindex="0" data-c="${s.a.code}">
    <span class="rk-stripe" style="background:${L.color}"></span>
    <div><div class="rk-name">${s.a.pro==="10"?"เขต":"อ."}${esc(s.a.name)}<small>${esc(s.a.provName)}</small></div>
      <div class="rk-why">${why(s)}</div>
      ${s.units?`<div class="rk-unit">หน่วยรับผิดชอบ: ${esc(s.units.unit)} · ${esc(s.units.plan)}</div>`:""}</div>
    <span class="rk-pill" style="background:${L.color};color:${s.lv===1?"#3a2c00":"#fff"}">${L.name}</span></div>`}).join("")
    || `<div class="rk-why" style="padding:14px 0">${updated?(lvFilter==null?"ยังไม่มีเขต/อำเภอที่เข้าเกณฑ์เฝ้าระวัง":"ไม่มีเขต/อำเภอในระดับนี้"):"กำลังโหลด…"}</div>`;
}

view.addEventListener("click",e=>{
  const lvb=e.target.closest(".rk-lv"); if(lvb){ const v=+lvb.dataset.lv; lvFilter=lvFilter===v?null:v; render(); return; }
  const tg=e.target.closest(".rk-tg"); if(tg){ scope=tg.dataset.s; view.querySelectorAll(".rk-tg").forEach(b=>b.setAttribute("aria-pressed",b===tg)); render(); fit(); return; }
  const row=e.target.closest(".rk-row"); if(row&&map){ const p=polys[row.dataset.c]; if(p){ map.fitBounds(p.getBounds(),{maxZoom:13,padding:[20,20]}); p.openPopup(); $("rk-map").scrollIntoView({behavior:"smooth",block:"center"}); } }
});
view.addEventListener("keydown",e=>{ if(e.key==="Enter"&&e.target.classList.contains("rk-row")) e.target.click() });
$("rk-reload").addEventListener("click",load);

function fit(){ if(!map) return; const b=L_.latLngBounds([]); AREAS.forEach(a=>{ if(!scope||(scope==="10"?a.pro==="10":a.pro!=="10")) b.extend(polys[a.code].getBounds()) }); if(b.isValid()) map.fitBounds(b,{padding:[10,10]}); }
function loadLeaflet(){ return new Promise((res,rej)=>{ if(window.L) return res(); const l=document.createElement("link"); l.rel="stylesheet"; l.href=LEAF+"leaflet.min.css"; document.head.appendChild(l); const s=document.createElement("script"); s.src=LEAF+"leaflet.min.js"; s.onload=res; s.onerror=()=>rej(new Error("โหลดแผนที่ไม่ได้")); document.head.appendChild(s); }); }

let started=false;
async function start(){
  if(started){ setTimeout(()=>{ if(map){ const z=map.getZoom(); map.invalidateSize(); if(z>14) fit(); } },50); return; }
  started=true; render();
  try{
    await loadLeaflet(); L_=window.L;
    map=L_.map("rk-map").setView([13.8,100.45],9);
    L_.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:18,attribution:"&copy; OpenStreetMap"}).addTo(map);
    AREAS.forEach(a=>{
      const latlngs=a.rings.map(r=>r.map(([x,y])=>[y,x]));
      polys[a.code]=L_.polygon(latlngs,{fillColor:LV[0].color,fillOpacity:LV[0].op,color:"#fff",weight:1}).bindPopup("กำลังโหลด…").bindTooltip((a.pro==="10"?"เขต":"อ.")+a.name,{sticky:true,direction:"top"}).addTo(map);
    });
    fit();
  }catch(e){ $("rk-map").innerHTML=`<div class="rk-err">${esc(e.message)}</div>`; }
  await load();
  if(map){ map.invalidateSize(); fit(); }
  setInterval(()=>{ if(!view.hidden&&!document.hidden) load(); },REFRESH_MS);
  document.addEventListener("visibilitychange",()=>{ if(!document.hidden&&!view.hidden) load(); });
}

if(location.hash==="#risk") showRisk(true);
})();
