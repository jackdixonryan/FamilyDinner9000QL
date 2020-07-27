import json
import os

FILE_PATH = os.path.dirname(os.path.realpath(__file__)) + "/"
CHARACTER_DESTINATION_DIR = FILE_PATH + "characters/"
CHARACTER_INPUT_DIR = FILE_PATH + "exported_data/"
FRONT_END_JSON_FILE = "/Users/Carolyn/Documents/D&D/fd-9000-fe/public/list.json"

character_list = []

def export_the_good_bits(filename):
    print("Deserializing json in " + filename + ".")
    with open(CHARACTER_INPUT_DIR + filename, 'r') as input_file:
        user_data = json.load(input_file)
        loaded = json.loads(user_data["exportData"])

    flat_list = []
    for sublist in loaded["spells"]:
        for item in sublist:
            flat_list.append(item)
    loaded["spells"] = flat_list
    
    if not os.path.exists(CHARACTER_DESTINATION_DIR):
        os.makedirs(CHARACTER_DESTINATION_DIR)
    
    with open(CHARACTER_DESTINATION_DIR + filename, 'w') as output_file:
        json.dump(loaded, output_file, sort_keys=True, indent=4)

    character_list.append(loaded)
 
def port_json_to_front_end():
    print("Writing all characters to exportable json list.")
    file_str = "[\n"
    for character in character_list:
        file_str += json.dumps(character)
        file_str += ",\n"
    
    file_str = file_str[:-2]
    file_str += "\n]"
    
    # TODO eventually we will want this to maybe get set in the server so it can be accessed other than locally
    with open(FRONT_END_JSON_FILE, 'w') as concat_file:
        concat_file.write(file_str)

def main():
    for filename in os.listdir(CHARACTER_INPUT_DIR):
        export_the_good_bits(filename)
    port_json_to_front_end()


if __name__ == '__main__':
    main()