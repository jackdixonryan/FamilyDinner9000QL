import json
import os

FILE_PATH = os.path.dirname(os.path.realpath(__file__)) + "/"
CHARACTER_DESTINATION_DIR = FILE_PATH + "characters/"
CHARACTER_INPUT_DIR = FILE_PATH + "exported_data/"

def export_the_good_bits(filename):
    with open(CHARACTER_INPUT_DIR + filename, 'r') as input_file:
        user_data = json.load(input_file)
        loaded = json.loads(user_data["exportData"])
    
    if not os.path.exists(CHARACTER_DESTINATION_DIR):
        os.makedirs(CHARACTER_DESTINATION_DIR)
    
    with open(CHARACTER_DESTINATION_DIR + filename, 'w') as output_file:
        json.dump(loaded, output_file, sort_keys=True, indent=4)

def main():
    for filename in os.listdir(CHARACTER_INPUT_DIR):
        export_the_good_bits(filename)


if __name__ == '__main__':
    main()