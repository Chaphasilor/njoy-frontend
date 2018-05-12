<!DOCTYPE html>
<html>
  <head>
    <title>Portal</title>
  </head>
  <body>
    <?php

      $dir = 'videos';
      $files = array_diff(scandir($dir), array('..', '.'));

      if (!empty($_GET[('p')])) {
        $page = $_GET[('p')]-1;
      } else {
        $page = 0;
      }

      $items = 10;
      $range = 2+$page*$items;

      for ($i = $range; $i < $range+$items; $i++) {

        if ($i < sizeof($files)+2) {
          echo "
            <video controls width='400' height='225' style='display:block;'>
              <source src='".$dir."/".$files[$i]."'>
            </video>
               ";
        }

      }

      if ($page != 0) {
        echo "<a href='index.php?p=".$page."'>Previous Page</a>";
      }

    ?>

    <a href='index.php?p=<?php echo $page+2; ?>'>Next Page</a>

  </body>
</html>
