using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Data.SqlClient;
using System;


public class IndexModel : PageModel
{
    //Change the connection string here

    //public static string conString = @"Data Source=SOULPICKER\SQLEXPRESS;Initial Catalog=SmartDrawer;Integrated Security=True;";

    public static string conString = @"Server=tcp:disastersservers.database.windows.net,1433;Initial Catalog=disasterdatabase;Persist Security Info=False;User ID=disasterservers;Password=Microsoft123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

    SqlCommand cm;

    [BindProperty]

    public string Object { get; set; }



    protected void Page_Load(object sender, EventArgs e)

    {



    }
    public IActionResult OnPostSubmitForm()
    {
        // Your logic for handling the form submission goes here
        string name = Request.Form["Name"];
        string location = Request.Form["Location"];

        // Call the function to insert into the database
        InsertIntoDatabase(name, location);

        return RedirectToPage(); // Redirect back to the same page
    }



    private void InsertIntoDatabase(string name, string location)
    {
        using (SqlConnection con = new SqlConnection(conString))
        {
            con.Open();

            string sql = "INSERT INTO user_data VALUES (@name, @location)";
            using (SqlCommand cm = new SqlCommand(sql, con))
            {
                cm.Parameters.AddWithValue("@name", name);
                cm.Parameters.AddWithValue("@location", location);
                int dr = cm.ExecuteNonQuery();

                if (dr > 0)
                {
                    ViewData["Message"] = "Data Inserted Successfully";
                }
                else
                {
                    ViewData["Message"] = "Data Insertion Failed";
                }
            }
        }
    }
}
//using Microsoft.AspNetCore.Mvc;


//using Microsoft.AspNetCore.Mvc;

//using Microsoft.AspNetCore.Mvc.RazorPages;

//using System;

//using System.Data.SqlClient;

//public class IndexModel : PageModel

//{

//    //Change the connection string here

//    //public static string conString = @"Data Source=SOULPICKER\SQLEXPRESS;Initial Catalog=SmartDrawer;Integrated Security=True;";

//    public static string conString = @"Server=tcp:disastersservers.database.windows.net,1433;Initial Catalog=disasterdatabase;Persist Security Info=False;User ID=disasterservers;Password=Microsoft123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

//    SqlCommand cm;

//    [BindProperty]

//    public string Object { get; set; }



//    protected void Page_Load(object sender, EventArgs e)

//    {



//    }
//    public IActionResult OnPostSubmitForm()
//    {
//        // Your logic for handling the form submission goes here
//        string name = Request.Form["Name"];
//        string location = Request.Form["Location"];

//        // Call the function to insert into the database
//        InsertIntoDatabase(name, location);

//        return RedirectToPage(); // Redirect back to the same page
//    }



//    private void InsertIntoDatabase(string name, string location)
//    {
//        using (SqlConnection con = new SqlConnection(conString))
//        {
//            con.Open();

//            string sql = "INSERT INTO user_data VALUES (@name, @location)";
//            using (SqlCommand cm = new SqlCommand(sql, con))
//            {
//                cm.Parameters.AddWithValue("@name", name);
//                cm.Parameters.AddWithValue("@location", location);
//                int dr = cm.ExecuteNonQuery();

//                if (dr > 0)
//                {
//                    ViewData["Message"] = "Data Inserted Successfully";
//                }
//                else
//                {
//                    ViewData["Message"] = "Data Insertion Failed";
//                }
//            }
//        }
//    }
//}








