import java.io.*;
import java.net.*;
import java.util.concurrent.TimeUnit;
import net.tinyos.packet.BuildSource;
import net.tinyos.packet.PacketSource;
import net.tinyos.util.PrintStreamMessenger;

public class Listener {
    private static boolean isTest() {
        return true;
    }

    public static void main(String args[]) throws IOException {
        DataOutputStream outputStream = getOutputStream();
        PacketSource reader = getPackgetSource();
        try {
            if (isTest()) {
                runTestOutput(outputStream);
            } else {
                String hex = "";
                reader.open(PrintStreamMessenger.err);
                for (;;) {
                    hex = bytesToHexString(reader.readPacket());
                    outputStream.writeBytes(hex);
                    System.out.println(hex);
                    System.out.flush();
                }
            }
        } catch (IOException e) {
            System.err.println("Error on " + reader.getName() + ": " + e);
        }
    }

    private static void runTestOutput(DataOutputStream outputStream) throws IOException {
        System.out.println("Sending fake output each 5 seconds");
        String[] c = {
            "00 FF FF 00 42 0A 00 01 0F CC 1D 3F 02 27 00 BD 01 6D",
            "00 FF FF 00 42 0A 00 01 0F CB 1D 3F 02 16 01 40 02 0E",
            "00 FF FF 00 42 0A 00 01 0F CD 1D 3C 02 19 01 55 01 C3",
            "00 FF FF 00 42 0A 00 01 0F CC 1D 3F 02 1A 00 AB 01 3F",
            "00 FF FF 00 42 0A 00 01 0F CB 1D 3F 02 1C 01 2B 01 F5",
            "00 FF FF 00 42 0A 00 01 0F CC 1D 3E 02 1C 01 51 01 AF",
            "00 FF FF 00 42 0A 00 01 0F CC 1D 3D 02 27 00 C4 01 78",
            "00 FF FF 00 42 0A 00 01 0F CC 1D 3D 02 27 01 17 01 E4",
            "00 FF FF 00 42 0A 00 01 0F CC 1D 3F 02 28 01 5D 01 EE",
            "00 FF FF 00 42 0A 00 01 0F CD 1D 3E 02 22 00 FA 01 18"
        };
        for (int i = 0; i < c.length; i++) {
            outputStream.writeBytes(String.valueOf(c[i]));
            System.out.println(c[i]);
            if (i == c.length - 1) {
                i = 0;
            }
            try {
                TimeUnit.SECONDS.sleep(5);
            } catch (java.lang.InterruptedException e) {
            }
        }
    }

    private static DataOutputStream getOutputStream() throws IOException {
        try {
            ServerSocket server = new ServerSocket(6789);
            System.out.println("Waiting for connection...");
            Socket socket = server.accept();
            return new DataOutputStream(socket.getOutputStream());
        } catch (IOException e) {
            System.err.println("Server accept error: " + e);
            System.exit(2);
            throw e;
        }
    }

    private static PacketSource getPackgetSource() {
        String source = "serial@/dev/ttyUSB0:telosb";
        PacketSource reader;        
        reader = BuildSource.makePacketSource(source);
        if (reader == null) {
            System.err.println("Invalid packet source (check your MOTECOM environment variable)");
            System.exit(2);
        }
        return reader;
    }

    private static String bytesToHexString(byte[] b) {
        String rt = "";
        for (int i = 0; i < b.length; i++) {
            String bs = Integer.toHexString(b[i] & 0xff).toUpperCase();
            if (b[i] >= 0 && b[i] < 16) {
                rt = rt + "0";
            }
            rt = rt + bs + " ";
        }
        return rt;
    }
}
