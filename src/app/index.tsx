
import { useState } from 'react';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Komponen utama aplikasi
export default function App() {

  // 1. STATE MANAGEMENT
  // Menyimpan isi 9 kotak permainan
  const [board, setBoard] = useState<(string | null)[]>(
    Array(9).fill(null)
  );

  // Menentukan giliran pemain
  const [xIsNext, setXIsNext] = useState(true);

  // 2. LOGIKA MENENTUKAN PEMENANG
  const calculateWinner = (
    squares: (string | null)[]
  ): string | null => {

    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  };

  // Memeriksa pemenang
  const winner = calculateWinner(board);

  // Memeriksa apakah semua kotak terisi
  const isBoardFull = board.every(
    (square) => square !== null
  );

  // 3. EVENT HANDLER
  // Fungsi ketika kotak ditekan
  const handlePress = (index: number) => {

    // Mencegah kotak yang sudah terisi diubah
    // Mencegah permainan berlanjut setelah menang
    if (board[index] !== null || winner || isBoardFull) {
      return;
    }

    // Membuat salinan array agar state tidak diubah langsung
    const newBoard = [...board];

    // Mengisi kotak dengan X atau O
    newBoard[index] = xIsNext ? 'X' : 'O';

    // Memperbarui state
    setBoard(newBoard);

    // Mengganti giliran pemain
    setXIsNext(!xIsNext);
  };

  // Fungsi untuk memulai ulang permainan
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  // 4. KOMPONEN KOTAK PERMAINAN
  const renderSquare = (index: number) => {
    return (
      <TouchableOpacity
        key={index}
        style={styles.square}
        onPress={() => handlePress(index)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.squareText,
            board[index] === 'X'
              ? styles.textX
              : styles.textO,
          ]}
        >
          {board[index]}
        </Text>
      </TouchableOpacity>
    );
  };

  // 5. MENENTUKAN STATUS PERMAINAN
  let status: string;

  if (winner) {
    status = `Pemenang: ${winner}!`;
  } else if (isBoardFull) {
    status = 'Permainan Seri (Draw)!';
  } else {
    status = `Giliran Pemain: ${xIsNext ? 'X' : 'O'}`;
  }

  // 6. TAMPILAN APLIKASI
  return (
    <SafeAreaView style={styles.container}>

      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>
        TIC TAC TOE
      </Text>

      <Text style={styles.subtitle}>
        Permainan X dan O
      </Text>

      <View style={styles.statusBox}>
        <Text style={styles.status}>
          {status}
        </Text>
      </View>

      {/* Papan permainan 3 x 3 */}
      <View style={styles.board}>

        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>

        <View style={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>

        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>

      </View>

      {/* Keterangan pemain */}
      <View style={styles.players}>
        <Text style={styles.playerX}>
          X = Pemain 1
        </Text>

        <Text style={styles.playerO}>
          O = Pemain 2
        </Text>
      </View>

      {/* Tombol mulai ulang */}
      <TouchableOpacity
        style={styles.resetButton}
        onPress={resetGame}
        activeOpacity={0.8}
      >
        <Text style={styles.resetButtonText}>
          ↻  MULAI ULANG
        </Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Selamat Bermain!
      </Text>

    </SafeAreaView>
  );
}

// 7. STYLING / DESAIN APLIKASI
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#243B53',
    letterSpacing: 2,
  },

  subtitle: {
    fontSize: 16,
    color: '#829AB1',
    marginTop: 5,
    marginBottom: 25,
  },

  statusBox: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginBottom: 25,
    elevation: 3,
  },

  status: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#334E68',
  },

  board: {
    backgroundColor: '#243B53',
    padding: 5,
    borderRadius: 12,
    elevation: 5,
  },

  row: {
    flexDirection: 'row',
  },

  square: {
    width: 90,
    height: 90,
    backgroundColor: '#FFFFFF',
    margin: 3,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  squareText: {
    fontSize: 45,
    fontWeight: 'bold',
  },

  textX: {
    color: '#E74C3C',
  },

  textO: {
    color: '#3498DB',
  },

  players: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
    marginTop: 25,
  },

  playerX: {
    color: '#E74C3C',
    fontWeight: 'bold',
    fontSize: 14,
  },

  playerO: {
    color: '#3498DB',
    fontWeight: 'bold',
    fontSize: 14,
  },

  resetButton: {
    backgroundColor: '#27AE60',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 12,
    marginTop: 30,
    elevation: 3,
  },

  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  footer: {
    marginTop: 25,
    color: '#829AB1',
    fontSize: 14,
  },

});
