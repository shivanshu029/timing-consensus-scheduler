import com.fasterxml.jackson.databind.ObjectMapper;
import org.bson.types.ObjectId;
import java.io.File;
import java.io.IOException;
import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class SlotGenerator {

    public static void main(String[] args) throws IOException {
        List<Slot> slots = new ArrayList<>();
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        DateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");
        Date startDate = dateFormat.parse("2023-01-01");
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startDate);
        for (int i = 0; i < 8760; i++) {
            Date date = calendar.getTime();
            for (int j = 0; j < 24; j++) {
                Time time = Time.valueOf(j + ":00:00");
                slots.add(new Slot(new ObjectId(), date, time, null, null));
            }
            calendar.add(Calendar.DAY_OF_YEAR, 1);
        }
        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(new File("slots.json"), slots);
    }

}
