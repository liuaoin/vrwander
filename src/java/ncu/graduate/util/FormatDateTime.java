package ncu.graduate.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class FormatDateTime {

    public Date parseDate() {
        Date date = null;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            date = sdf.parse(sdf.format(new Date()));
        } catch (ParseException ex) {
            ex.printStackTrace();
        }
        return date;
    }
}
