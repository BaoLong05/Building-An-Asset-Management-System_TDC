<?php
try {
    new PDO("mysql:host=project-mysql;port=3306;dbname=building_a_material_management_system_tdc", "root", "1234");
    echo "OK\n";
} catch(Exception $e) {
    echo "FAIL: " . $e->getMessage() . "\n";
}
