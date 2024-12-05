<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Résolveur de Sudoku</title>
    <style>
        table {
            border-collapse: collapse;
            margin: 20px auto;
        }
        td {
            border: 1px solid #000;
            width: 40px;
            height: 40px;
            text-align: center;
        }
        input {
            width: 100%;
            height: 100%;
            text-align: center;
            font-size: 18px;
        }
    </style>
</head>
<body>
    <h1 style="text-align: center;">Résolveur de Sudoku</h1>
    <form method="POST" action="">
        <table>
            <?php
            // Affichage du tableau HTML pour remplir le Sudoku
            for ($ligne = 0; $ligne < 9; $ligne++) {
                echo "<tr>";
                for ($col = 0; $col < 9; $col++) {
                    $name = "cell_" . $ligne . "_" . $col;
                    echo "<td><input type='text' name='$name' maxlength='1'></td>";
                }
                echo "</tr>";
            }
            ?>
        </table>
        <div style="text-align: center;">
            <input type="submit" name="resoudre" value="Résoudre">
        </div>
    </form>

    <?php
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        // Fonction pour vérifier si un nombre peut être placé dans une case
        function est_valide($grille, $ligne, $col, $num) {
            for ($x = 0; $x < 9; $x++) {
                if ($grille[$ligne][$x] == $num || $grille[$x][$col] == $num) {
                    return false;
                }
            }

            $startLigne = $ligne - $ligne % 3;
            $startCol = $col - $col % 3;
            for ($i = 0; $i < 3; $i++) {
                for ($j = 0; $j < 3; $j++) {
                    if ($grille[$i + $startLigne][$j + $startCol] == $num) {
                        return false;
                    }
                }
            }

            return true;
        }

        // Fonction pour résoudre le Sudoku
        function resoudre_sudoku(&$grille, $ligne, $col) {
            if ($ligne == 8 && $col == 9) {
                return true;
            }

            if ($col == 9) {
                $ligne++;
                $col = 0;
            }

            if ($grille[$ligne][$col] != 0) {
                return resoudre_sudoku($grille, $ligne, $col + 1);
            }

            for ($num = 1; $num <= 9; $num++) {
                if (est_valide($grille, $ligne, $col, $num)) {
                    $grille[$ligne][$col] = $num;
                    if (resoudre_sudoku($grille, $ligne, $col + 1)) {
                        return true;
                    }
                }
                $grille[$ligne][$col] = 0; // Backtracking
            }

            return false;
        }

        // Création de la grille à partir du formulaire soumis
        $grille = [];
        for ($ligne = 0; $ligne < 9; $ligne++) {
            for ($col = 0; $col < 9; $col++) {
                $name = "cell_" . $ligne . "_" . $col;
                $value = isset($_POST[$name]) ? $_POST[$name] : '';
                // Si l'utilisateur a laissé la case vide, mettre 0
                $grille[$ligne][$col] = ($value === '') ? 0 : (int)$value;
            }
        }

        // Résoudre le Sudoku
        if (resoudre_sudoku($grille, 0, 0)) {
            echo "<h2 style='text-align: center;'>Sudoku résolu :</h2>";
            echo "<table style='margin: 20px auto;'>";
            for ($ligne = 0; $ligne < 9; $ligne++) {
                echo "<tr>";
                for ($col = 0; $col < 9; $col++) {
                    echo "<td>" . $grille[$ligne][$col] . "</td>";
                }
                echo "</tr>";
            }
            echo "</table>";
        } else {
            echo "<p style='text-align: center;'>Aucune solution trouvée pour ce Sudoku.</p>";
        }
    }
    ?>
</body>
</html>
