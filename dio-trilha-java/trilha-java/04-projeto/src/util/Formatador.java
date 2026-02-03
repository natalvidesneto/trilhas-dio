package util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Formatador {
    private static final DateTimeFormatter FORMATTER_DATA = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
    
    public static String formatarData(LocalDateTime data) {
        return data.format(FORMATTER_DATA);
    }
    
    public static String formatarMoeda(double valor) {
        return String.format("R$%.2f", valor);
    }
}