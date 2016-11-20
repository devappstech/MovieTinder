import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;

public class Main {
	
	private static String urlServer = "http://192.168.0.14:8889/graphql";
	private static int idStart = 1;
	private static int idEnd = 1000;
	private static int voteMin = 100;
	
	public static void main(String[] args) {
		urlServer = args[0];
		idStart = Integer.parseInt(args[1]);
		idEnd = Integer.parseInt(args[2]);
		voteMin = Integer.parseInt(args[3]);
		
	    for(int i = idStart; i <= idEnd ; ++i){
		    StringBuilder result = new StringBuilder();
		    try{
			    URL url = new URL("http://www.omdbapi.com/?i="+imdbId(i)+"&plot=short&r=json");
			    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			    conn.setRequestMethod("GET");
			    BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			    String line;
			    while ((line = rd.readLine()) != null) {
			       result.append(line);
			    }
			    rd.close();
			    line = result.toString();
			    if(extractPart(line, "Type").equals("movie")){
			    	addFilm(extractPart(line, "Title"), extractPart(line, "Plot"), extractPart(line, "Poster"), extractPart(line, "imdbRating"), extractPart(line, "imdbVotes") );
			    }
		    }catch(Exception e){
		    	System.err.println("err :"+e.getMessage());
		    }
	    }
	    
	}
	
	private static String extractPart(String json, String part){
		for(String l : json.substring(2, json.length()-2).split("\",\"")){
			if(l.split("\":\"")[0].equals(part))return l.split("\":\"")[1];
		}
		return "null";
	}
	
	private static String imdbId(int id){
		String c = Integer.toString(id);
		int nb0 = 7 - c.length();
		for(int i = 0; i < nb0 ; ++i){
			c = "0"+c;
		}
		return "tt"+c;
	}
	
	private static void addFilm(String titre, String desc, String img, String rating, String votes){
	    if(!rating.equals("N/A") && !img.equals("N/A") && Integer.parseInt(votes.replaceAll(",", ""))>=voteMin)sendToServer(titre,desc,img,rating);
	}
	
	private static void sendToServer(String titre, String desc, String img, String rating){
	    HttpClient httpClient = HttpClientBuilder.create().build(); //Use this instead 
	    try {
	        HttpPost request = new HttpPost(urlServer);
	        String req = "mutation{addMovie(title:\""+titre+"\",description:\""+desc+"\",img:\""+img+"\",rating: "+rating+"){id}}";
	        StringEntity params =new StringEntity(req);
	        request.addHeader("content-type", "application/graphql");
	        request.addHeader("accept", "application/json");
	        request.setEntity(params);
	        HttpResponse response = httpClient.execute(request);
	    }catch (Exception ex) {
	        System.err.println("err");
	    }
	}

}
